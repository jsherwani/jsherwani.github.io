import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, ".export-cache", "train-auto-assets");
const outDir = path.join(root, "exports");
const outFile = path.join(outDir, "train-journey-auto.mp4");

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3CkO7uW4kLN7beBuWrOrFiFPoSh/";
const WIPE = 1.1;
const CITY_DWELL = 90;
const LISBON_CITY_DWELL = 88;
const LISBON_DWELL_WITH_END = 98;

const clips = {
  karachi: "hf_20260706_184807_1bb23aa0-6f3e-46fe-a371-c992e2c3770c.mp4",
  k2t: "hf_20260706_055132_7a77d922-e20d-4cab-a4e5-7c96fcf63fed.mp4",
  tunnel: "hf_20260706_055108_33662d28-2019-4398-a3b3-d1c74c77f3d3.mp4",
  t2h: "hf_20260706_060649_95316a97-c497-4131-8474-8c716dac15b6.mp4",
  hawaii: "hf_20260706_231741_3adbdfe5-84f1-40a1-87e4-21a290f26526.mp4",
  h2t: "hf_20260706_062519_dbd449c2-f03c-4b21-a7cd-88ea4cb5106f.mp4",
  t2sf: "hf_20260706_063148_b5f68075-f0e7-4c69-941e-333b31b82eb5.mp4",
  sf: "hf_20260706_185446_6b9ac00c-cb49-4a81-8a32-e013e7d38317.mp4",
  sf2t: "hf_20260706_063201_5a3cff0d-65dc-45ae-88f3-9d92385ff26e.mp4",
  t2l: "hf_20260706_062557_179e5a1f-47c0-4625-928f-fded57621e0a.mp4",
  lisbon: "hf_20260707_002258_a1adb59e-5309-4ec7-8281-bb1c77ed5775.mp4",
};

const trims = {
  karachi: { start: 0, end: 0 },
  hawaii: { start: 0, end: 0 },
  sf: { start: 0, end: 0 },
  lisbon: { start: 0, end: 0 },
  tunnel: { start: 0, end: 0 },
  k2t: { start: 7, end: 0 },
  t2h: { start: 3, end: 5.5 },
  h2t: { start: 6, end: 3 },
  t2sf: { start: 0, end: 6 },
  sf2t: { start: 2, end: 3 },
  t2l: { start: 0, end: 3 },
};

const music = {
  karachi: "https://ucb82479f9eae31bfd031baee23b.dl.dropboxusercontent.com/cd/0/inline/DDxWOh6zj0BksAmMqXCVVfPd1AFePcNh-ZSJRi_gIFLRbaK9YkRfmfoVr9S80arI9m4gg0BlIGTxlEvo3KNd9I5HhZ6a_ujCyDChRriSVChAR0IMYFwQdZjZsek45PRPM2M/file",
  hawaii: "https://ucf28ef7e4cf73a9a3cd41eb8495.dl.dropboxusercontent.com/cd/0/inline/DDzR_YpIQKDmsBHnyctj7XJGaSgZQTMGF5-_JN8JDTxxSqZmK_ZHGYXmDQiSiJ_RLmCUCmtweeg4paI24gppSz_lsLCIPCfyT7EmzzrFzcK7yfo863a_GGKaX2VpoCAvOK4/file",
  sf: "https://uc3db76bafc998b81e6971affdb0.dl.dropboxusercontent.com/cd/0/inline/DDxtOhuKeWxbXVhlZq124DyT73eesS0zqvJTH2Aursrzwc5NpoWx_mgcJXaNL-34U0sqbxHGNkKh1oFS8Qtlql_ehbVD4Z257CqVDelswWrGjGXa2TddF9cGI9C38pLn9oM/file",
  lisbon: "https://uc2c98c66fcbe92cd36571090fb3.dl.dropboxusercontent.com/cd/0/inline/DDw5AS7rl9Ar5Af6hWf7X4-irvhSHrdPj8tyc0arcgaFA6MaD61RZVAl5RQQfag8mw3Uh6_LAc-DWAEWANJ8_KGRBDW55Rz-2YlwtG0c9aNzDxhUTaZLyFCuS2-aMOh40BQ/file",
};

const sequence = [
  { key: "karachi", type: "city", duration: CITY_DWELL },
  { key: "k2t", type: "trans" },
  { key: "tunnel", type: "tunnel" },
  { key: "t2h", type: "arrival" },
  { key: "hawaii", type: "city", duration: CITY_DWELL },
  { key: "h2t", type: "trans" },
  { key: "tunnel", type: "tunnel" },
  { key: "t2sf", type: "arrival" },
  { key: "sf", type: "city", duration: CITY_DWELL },
  { key: "sf2t", type: "trans" },
  { key: "tunnel", type: "tunnel" },
  { key: "t2l", type: "arrival" },
  { key: "lisbon", type: "city", duration: LISBON_DWELL_WITH_END },
];

function mediaPath(key, ext) {
  return path.join(cacheDir, `${key}.${ext}`);
}

async function download(url, dest) {
  if (fs.existsSync(dest)) return;
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.tmp`;
  await new Promise((resolve, reject) => {
    const request = (currentUrl, redirects = 0) => {
      const lib = currentUrl.startsWith("https:") ? https : http;
      const req = lib.get(currentUrl, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          if (redirects > 8) reject(new Error(`Too many redirects for ${url}`));
          else request(new URL(res.headers.location, currentUrl).toString(), redirects + 1);
          return;
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(tmp);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      });
      req.on("error", reject);
    };
    request(url);
  });
  await fsp.rename(tmp, dest);
}

function runSync(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout}`);
  return result.stdout.trim();
}

function probeDuration(file) {
  return Number(runSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ]));
}

function hasAudioStream(file) {
  return runSync("ffprobe", [
    "-v", "error",
    "-select_streams", "a:0",
    "-show_entries", "stream=codec_type",
    "-of", "csv=p=0",
    file,
  ]).includes("audio");
}

function seconds(value) {
  return Number(value.toFixed(3));
}

function addMusicPiece(filters, pieces, inputIndex, localStart, localEnd, globalStart, chain) {
  if (localEnd - localStart <= 0.05) return;
  const label = `a${pieces.length}`;
  const delay = Math.max(0, Math.round(globalStart * 1000));
  const steps = [
    `atrim=start=${seconds(localStart)}:end=${seconds(localEnd)}`,
    "asetpts=PTS-STARTPTS",
    "aformat=channel_layouts=stereo",
    ...chain,
    `adelay=${delay}|${delay}`,
  ];
  filters.push(`[${inputIndex}:a]${steps.join(",")}[${label}]`);
  pieces.push(label);
}

function rightTinny() {
  return ["highpass=f=900", "lowpass=f=2600", "pan=stereo|c0=0.25*c0|c1=c1"];
}

function leftTinny() {
  return ["highpass=f=900", "lowpass=f=2600", "pan=stereo|c0=c0|c1=0.25*c1"];
}

function neutral(volume = 1) {
  return [`volume=${volume}`];
}

function addClipAudioPiece(filters, pieces, inputIndex, segment, segmentIndex, segmentCount) {
  if (segment.duration <= 0.05) return;
  const label = `clipa${pieces.length}`;
  const delay = Math.max(0, Math.round(segment.startTime * 1000));
  const fade = seconds(Math.min(WIPE, Math.max(0, segment.duration / 2 - 0.01)));
  const chain = [
    `atrim=duration=${seconds(segment.duration)}`,
    "asetpts=PTS-STARTPTS",
    "aformat=channel_layouts=stereo",
  ];
  if (segmentIndex > 0 && fade > 0) chain.push(`afade=t=in:st=0:d=${fade}`);
  if (segmentIndex < segmentCount - 1 && fade > 0) {
    chain.push(`afade=t=out:st=${seconds(Math.max(0, segment.duration - fade))}:d=${fade}`);
  }
  chain.push(`adelay=${delay}|${delay}`);
  filters.push(`[${inputIndex}:a]${chain.join(",")}[${label}]`);
  pieces.push(label);
}

async function main() {
  await fsp.mkdir(cacheDir, { recursive: true });
  await fsp.mkdir(outDir, { recursive: true });

  for (const [key, file] of Object.entries(clips)) {
    await download(`${CDN}${file}`, mediaPath(key, "mp4"));
  }
  for (const [key, url] of Object.entries(music)) {
    await download(url, mediaPath(key, "mp3"));
  }

  const clipDurations = Object.fromEntries(
    Object.keys(clips).map((key) => [key, probeDuration(mediaPath(key, "mp4"))])
  );
  const clipHasAudio = Object.fromEntries(
    Object.keys(clips).map((key) => [key, hasAudioStream(mediaPath(key, "mp4"))])
  );

  const segments = sequence.map((segment) => {
    if (segment.type === "city") return { ...segment, duration: segment.duration };
    const trim = trims[segment.key];
    const sourceDuration = clipDurations[segment.key];
    return {
      ...segment,
      start: trim.start,
      duration: Math.max(0.2, sourceDuration - trim.start - trim.end),
    };
  });

  let cursor = segments[0].duration;
  segments[0].startTime = 0;
  segments[0].endTime = segments[0].duration;
  for (let i = 1; i < segments.length; i++) {
    segments[i].startTime = cursor - WIPE;
    segments[i].endTime = segments[i].startTime + segments[i].duration;
    cursor = segments[i].endTime;
  }
  const outputDuration = cursor;

  const args = ["-y"];
  segments.forEach((segment) => {
    if (segment.type === "city") {
      args.push("-stream_loop", "-1", "-i", mediaPath(segment.key, "mp4"));
    } else {
      args.push("-ss", String(segment.start || 0), "-t", String(segment.duration), "-i", mediaPath(segment.key, "mp4"));
    }
  });
  const musicInputStart = args.filter((arg) => arg === "-i").length;
  const musicKeys = Object.keys(music);
  musicKeys.forEach((key) => args.push("-i", mediaPath(key, "mp3")));

  const filters = [];
  segments.forEach((segment, i) => {
    filters.push(
      `[${i}:v]trim=duration=${seconds(segment.duration)},setpts=PTS-STARTPTS,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30,setsar=1,format=yuv420p[v${i}]`
    );
  });

  let videoLabel = "v0";
  for (let i = 1; i < segments.length; i++) {
    const out = i === segments.length - 1 ? "vout0" : `vx${i}`;
    filters.push(`[${videoLabel}][v${i}]xfade=transition=wipeleft:duration=${WIPE}:offset=${seconds(segments[i].startTime)}[${out}]`);
    videoLabel = out;
  }
  filters.push(`[${videoLabel}]format=yuv420p[vout]`);

  const pieces = [];
  segments.forEach((segment, i) => {
    if (clipHasAudio[segment.key]) addClipAudioPiece(filters, pieces, i, segment, i, segments.length);
  });

  const addCityMusic = ({ city, arrivalKey, cityKey, departureKey, final = false }) => {
    const musicIndex = musicInputStart + musicKeys.indexOf(city);
    const arrival = arrivalKey ? segments.find((s) => s.key === arrivalKey) : null;
    const citySeg = segments.find((s) => s.key === cityKey && s.type === "city");
    const departure = departureKey ? segments.find((s) => s.key === departureKey) : null;
    const musicStart = arrival ? arrival.startTime : citySeg.startTime;
    const arrivalDuration = arrival ? arrival.duration : 0;
    const endGlobal = final ? citySeg.startTime + LISBON_DWELL_WITH_END : departure.endTime;
    const departureStartLocal = final
      ? citySeg.startTime + LISBON_CITY_DWELL - musicStart
      : departure.startTime - musicStart;
    const endLocal = endGlobal - musicStart;
    const arrivalHalf = arrivalDuration / 2;

    if (arrival) {
      addMusicPiece(filters, pieces, musicIndex, 0, arrivalHalf, musicStart, [
        "afade=t=in:st=0:d=" + seconds(arrivalHalf),
        ...rightTinny(),
      ]);
      addMusicPiece(filters, pieces, musicIndex, arrivalHalf, arrivalDuration, musicStart + arrivalHalf, neutral(1));
    }

    const bodyStart = arrival ? arrivalDuration : 0;
    const settleStart = 15;
    const settleEnd = 17.5;
    addMusicPiece(filters, pieces, musicIndex, bodyStart, Math.min(settleStart, departureStartLocal), musicStart + bodyStart, neutral(1));
    addMusicPiece(filters, pieces, musicIndex, Math.max(bodyStart, settleStart), Math.min(settleEnd, departureStartLocal), musicStart + settleStart, [
      "volume=eval=frame:volume='if(isnan(t),1,1-0.75*min(t,2.5)/2.5)'",
    ]);
    addMusicPiece(filters, pieces, musicIndex, Math.max(bodyStart, settleEnd), departureStartLocal, musicStart + settleEnd, neutral(0.25));

    if (final) {
      addMusicPiece(filters, pieces, musicIndex, departureStartLocal, endLocal, musicStart + departureStartLocal, [
        "volume=0.25",
        `afade=t=out:st=0:d=${seconds(endLocal - departureStartLocal)}`,
      ]);
    } else {
      const departureDuration = departure.duration;
      const departureHalf = departureDuration / 2;
      addMusicPiece(filters, pieces, musicIndex, departureStartLocal, departureStartLocal + departureHalf, departure.startTime, [
        "volume=0.25",
        ...leftTinny(),
      ]);
      addMusicPiece(filters, pieces, musicIndex, departureStartLocal + departureHalf, endLocal, departure.startTime + departureHalf, [
        "volume=0.25",
        `afade=t=out:st=0:d=${seconds(departureDuration - departureHalf)}`,
        ...leftTinny(),
      ]);
    }
  };

  addCityMusic({ city: "karachi", cityKey: "karachi", departureKey: "k2t" });
  addCityMusic({ city: "hawaii", arrivalKey: "t2h", cityKey: "hawaii", departureKey: "h2t" });
  addCityMusic({ city: "sf", arrivalKey: "t2sf", cityKey: "sf", departureKey: "sf2t" });
  addCityMusic({ city: "lisbon", arrivalKey: "t2l", cityKey: "lisbon", final: true });

  filters.push(`[${pieces.join("][")}]amix=inputs=${pieces.length}:duration=longest:normalize=0,atrim=duration=${seconds(outputDuration)},alimiter=limit=0.95[aout]`);

  args.push(
    "-filter_complex", filters.join(";"),
    "-map", "[vout]",
    "-map", "[aout]",
    "-t", String(seconds(outputDuration)),
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "20",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-movflags", "+faststart",
    outFile
  );

  console.log(`Rendering ${outFile}`);
  console.log(`Approx duration: ${seconds(outputDuration)}s`);
  const child = spawn("ffmpeg", args, { stdio: "inherit" });
  await new Promise((resolve, reject) => {
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)));
  });
  console.log(outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
