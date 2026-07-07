import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, ".export-cache", "screen-record");
const framesDir = path.join(cacheDir, "frames");
const audioFile = path.join(cacheDir, "audio.webm");
const concatFile = path.join(cacheDir, "frames.ffconcat");
const rawVideoFile = path.join(cacheDir, "video-only-raw.mp4");
const videoOnlyFile = path.join(cacheDir, "video-only.mp4");
function resolveFromRoot(file) {
  return path.isAbsolute(file) ? file : path.join(root, file);
}
const mp4File = resolveFromRoot(process.env.TRAIN_CAPTURE_OUTPUT || "exports/train-journey-screen-record.mp4");
const outDir = path.dirname(mp4File);
const localUrl = process.env.TRAIN_CAPTURE_URL || "http://localhost:8000/";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewport = { width: 1280, height: 720 };
const captureSeconds = Number(process.env.TRAIN_CAPTURE_SECONDS || 460);
const cdpPort = Number(process.env.TRAIN_CAPTURE_CDP_PORT || 9333);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        else resolve(JSON.parse(body));
      });
    }).on("error", reject);
  });
}

async function waitForCdpTarget() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const targets = await getJson(`http://127.0.0.1:${cdpPort}/json/list`);
      const target = targets.find((t) => t.type === "page" && (t.url || "").startsWith(localUrl));
      if (target && target.webSocketDebuggerUrl) return target;
    } catch (_) {}
    await sleep(250);
  }
  throw new Error("Timed out waiting for Chrome DevTools target");
}

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.listeners = new Map();
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)));
        else resolve(message.result);
        return;
      }
      const listeners = this.listeners.get(message.method);
      if (listeners && listeners.size) {
        listeners.forEach((listener) => listener(message.params || {}));
        return;
      }
      this.events.push(message);
    });
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    const promise = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.ws.send(payload);
    return promise;
  }

  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method).add(listener);
  }

  off(method, listener) {
    const listeners = this.listeners.get(method);
    if (listeners) listeners.delete(listener);
  }

  close() {
    this.ws.close();
  }
}

async function createUploadServer() {
  await fsp.mkdir(cacheDir, { recursive: true });
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
  let uploadResolve;
  let uploadReject;
  const uploaded = new Promise((resolve, reject) => {
    uploadResolve = resolve;
    uploadReject = reject;
  });
  const server = http.createServer((req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders).end();
      return;
    }
    if (req.method !== "POST" || req.url !== "/upload-audio") {
      res.writeHead(404, corsHeaders).end();
      return;
    }
    const file = fs.createWriteStream(audioFile);
    let size = 0;
    req.on("data", (chunk) => { size += chunk.length; });
    req.pipe(file);
    file.on("finish", () => {
      res.writeHead(200, { ...corsHeaders, "content-type": "text/plain" }).end("ok");
      uploadResolve({ size });
    });
    file.on("error", uploadReject);
    req.on("error", uploadReject);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { server, uploaded, port: server.address().port };
}

function run(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 50 * 1024 * 1024,
  });
  if (result.status !== 0) throw new Error(`${command} failed:\n${result.stderr || result.stdout}`);
  return result.stdout;
}

async function stopChrome(chrome) {
  if (chrome.exitCode !== null) return;
  chrome.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    sleep(5000),
  ]);
  if (chrome.exitCode !== null) return;
  chrome.kill("SIGKILL");
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    sleep(2000),
  ]);
}

async function removeProfileDir(profileDir) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await fsp.rm(profileDir, { recursive: true, force: true });
      return;
    } catch (err) {
      if (!["EBUSY", "ENOTEMPTY", "EPERM"].includes(err.code) || attempt === 4) {
        console.warn(`Could not remove temporary Chrome profile ${profileDir}: ${err.message}`);
        return;
      }
      await sleep(500 * (attempt + 1));
    }
  }
}

function audioRecorderScript(uploadUrl) {
  return `
    (async () => {
      window.__trainCaptureAudioStatus = { status: "starting" };

      function installTrainAudioCapture() {
        if (window.__trainCaptureAudio) return window.__trainCaptureAudio;
        if (!window.__trainJourneyDebug) throw new Error("Train debug hooks are unavailable");

        const debug = window.__trainJourneyDebug;
        let refs = debug.refs();
        if (!refs.audioCtx) {
          debug.preloadMusic();
          refs = debug.refs();
        }
        const ctx = refs.audioCtx;
        if (!ctx) throw new Error("AudioContext is unavailable");
        ctx.resume().catch(() => {});

        const destination = ctx.createMediaStreamDestination();
        const connectedMusicNodes = new WeakSet();
        const videoSources = [];
        const videoSourceErrors = [];

        refs.v.forEach((el) => {
          try {
            const source = ctx.createMediaElementSource(el);
            const gain = ctx.createGain();
            source.connect(gain);
            gain.connect(ctx.destination);
            gain.connect(destination);
            videoSources.push({ el, gain });
          } catch (err) {
            videoSourceErrors.push(String(err && err.message || err));
          }
        });

        function updateVideoGains() {
          videoSources.forEach(({ el, gain }) => {
            gain.gain.value = el.muted ? 0 : el.volume;
          });
        }

        function connectMusicNodes() {
          refs = debug.refs();
          const nodes = refs.musicNodes;
          if (!nodes || !nodes.mainGain || connectedMusicNodes.has(nodes.mainGain)) return;
          nodes.mainGain.connect(destination);
          connectedMusicNodes.add(nodes.mainGain);
        }

        const timer = setInterval(() => {
          updateVideoGains();
          connectMusicNodes();
        }, 50);
        updateVideoGains();
        connectMusicNodes();

        window.__trainCaptureAudio = {
          stream: destination.stream,
          videoSourceErrors,
          stop() {
            clearInterval(timer);
            destination.stream.getTracks().forEach((track) => track.stop());
          }
        };
        return window.__trainCaptureAudio;
      }

      const audioCapture = installTrainAudioCapture();
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm"
      ];
      const mimeType = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || "";
      const recorder = new MediaRecorder(audioCapture.stream, mimeType ? { mimeType } : undefined);
      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size) chunks.push(event.data);
      };
      recorder.onstop = async () => {
        window.__trainCaptureAudioStatus = { status: "uploading", chunks: chunks.length };
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        await fetch(${JSON.stringify(uploadUrl)}, { method: "POST", body: blob });
        audioCapture.stop();
        window.__trainCaptureAudioStatus = {
          status: "uploaded",
          size: blob.size,
          mimeType: recorder.mimeType,
          videoSourceErrors: audioCapture.videoSourceErrors
        };
      };
      window.__stopTrainAudioCapture = () => {
        if (recorder.state !== "inactive") recorder.stop();
      };
      recorder.start(1000);
      window.__trainCaptureAudioStatus = {
        status: "recording",
        mimeType: recorder.mimeType,
        tracks: audioCapture.stream.getTracks().map((track) => ({
          kind: track.kind,
          label: track.label,
          enabled: track.enabled,
          settings: track.getSettings()
        })),
        videoSourceErrors: audioCapture.videoSourceErrors
      };
      setTimeout(() => window.__stopTrainAudioCapture(), ${Math.round(captureSeconds * 1000)});
      return window.__trainCaptureAudioStatus;
    })()
  `;
}

function concatPath(file) {
  return file.replaceAll("'", "'\\''");
}

function buildFrameConcat(frames) {
  if (frames.length < 2) throw new Error(`Only captured ${frames.length} frame(s)`);
  const lines = ["ffconcat version 1.0"];
  for (let i = 0; i < frames.length; i += 1) {
    lines.push(`file '${concatPath(path.join(framesDir, frames[i].file))}'`);
    const next = frames[i + 1];
    let duration = next ? next.timestamp - frames[i].timestamp : 1 / 30;
    if (!Number.isFinite(duration) || duration <= 0) duration = 1 / 30;
    duration = Math.min(0.25, Math.max(1 / 120, duration));
    lines.push(`duration ${duration.toFixed(6)}`);
  }
  lines.push(`file '${concatPath(path.join(framesDir, frames[frames.length - 1].file))}'`);
  return lines.join("\n") + "\n";
}

async function startScreencast(cdp) {
  await fsp.mkdir(framesDir, { recursive: true });
  const frames = [];
  const writes = [];
  let count = 0;

  const onFrame = (params) => {
    const file = `frame-${String(count).padStart(6, "0")}.jpg`;
    const timestamp = params.metadata && Number.isFinite(params.metadata.timestamp)
      ? params.metadata.timestamp
      : Date.now() / 1000;
    count += 1;
    frames.push({ file, timestamp });
    writes.push(fsp.writeFile(path.join(framesDir, file), params.data, "base64"));
    cdp.send("Page.screencastFrameAck", { sessionId: params.sessionId }).catch(() => {});
  };

  cdp.on("Page.screencastFrame", onFrame);
  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 90,
    maxWidth: viewport.width,
    maxHeight: viewport.height,
    everyNthFrame: 1,
  });

  return {
    frameCount: () => count,
    async stop() {
      await cdp.send("Page.stopScreencast").catch(() => {});
      cdp.off("Page.screencastFrame", onFrame);
      await Promise.all(writes);
      return frames;
    },
  };
}

async function encodeVideo(frames) {
  await fsp.writeFile(concatFile, buildFrameConcat(frames));
  run("ffmpeg", [
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concatFile,
    "-vf", `scale=${viewport.width}:${viewport.height}:force_original_aspect_ratio=decrease,pad=${viewport.width}:${viewport.height}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p`,
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-color_range", "tv",
    "-colorspace", "bt709",
    "-color_primaries", "bt709",
    "-color_trc", "bt709",
    rawVideoFile,
  ]);

  const rawDuration = Number(run("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    rawVideoFile,
  ]).trim());
  const padSeconds = Number.isFinite(rawDuration) ? Math.max(0, captureSeconds - rawDuration) : 0;
  if (padSeconds <= 0.05) {
    await fsp.copyFile(rawVideoFile, videoOnlyFile);
    return;
  }

  run("ffmpeg", [
    "-y",
    "-i", rawVideoFile,
    "-vf", `tpad=stop_mode=clone:stop_duration=${padSeconds.toFixed(6)},format=yuv420p`,
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-color_range", "tv",
    "-colorspace", "bt709",
    "-color_primaries", "bt709",
    "-color_trc", "bt709",
    videoOnlyFile,
  ]);
}

async function muxAudio() {
  run("ffmpeg", [
    "-y",
    "-i", videoOnlyFile,
    "-i", audioFile,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-t", String(captureSeconds),
    "-movflags", "+faststart",
    mp4File,
  ]);
}

async function withTimeout(promise, ms, label) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  await fsp.mkdir(outDir, { recursive: true });
  await fsp.rm(cacheDir, { recursive: true, force: true });
  await fsp.rm(mp4File, { force: true });
  await fsp.mkdir(framesDir, { recursive: true });

  const upload = await createUploadServer();
  const profileDir = path.join(os.tmpdir(), `train-record-chrome-${Date.now()}`);
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profileDir}`,
    "--headless=new",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--autoplay-policy=no-user-gesture-required",
    "--force-device-scale-factor=1",
    `--window-size=${viewport.width},${viewport.height}`,
    localUrl,
  ], { stdio: ["ignore", "pipe", "pipe"] });

  let frames;
  try {
    const target = await waitForCdpTarget();
    const cdp = new Cdp(target.webSocketDebuggerUrl);
    await cdp.ready();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.bringToFront");
    await sleep(1500);

    const pageInfo = await cdp.send("Runtime.evaluate", {
      expression: "({ title: document.title, width: innerWidth, height: innerHeight, hasDebug: !!document.getElementById('__trainJourneyDebugState') })",
      returnByValue: true,
    });
    console.log("Page:", pageInfo.result.value);

    const uploadUrl = `http://127.0.0.1:${upload.port}/upload-audio`;
    const audioStarted = await cdp.send("Runtime.evaluate", {
      expression: audioRecorderScript(uploadUrl),
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    });
    console.log("Audio recorder:", audioStarted.result.value);

    const screencast = await startScreencast(cdp);
    await cdp.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });

    for (let elapsed = 0; elapsed < captureSeconds; elapsed += 5) {
      await sleep(Math.min(5, captureSeconds - elapsed) * 1000);
      const current = Math.min(captureSeconds, elapsed + 5);
      if (current % 30 === 0 || current === captureSeconds) {
        console.log(`Recording: ${current}/${captureSeconds}s (${screencast.frameCount()} frames)`);
      }
    }

    frames = await screencast.stop();
    const uploaded = await withTimeout(upload.uploaded, 30000, "Audio upload");
    console.log("Uploaded audio capture:", uploaded);
    console.log(`Captured ${frames.length} viewport frames`);
    cdp.close();
  } finally {
    upload.server.close();
    await stopChrome(chrome);
    await removeProfileDir(profileDir);
  }

  await encodeVideo(frames);
  await muxAudio();
  console.log(mp4File);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
