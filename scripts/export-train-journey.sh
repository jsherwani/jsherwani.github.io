#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

URL="${TRAIN_CAPTURE_URL:-http://localhost:8000/}"
DURATION="${TRAIN_CAPTURE_SECONDS:-458}"
OUTPUT="${TRAIN_CAPTURE_OUTPUT:-exports/train-journey-screen-record.mp4}"
CDP_PORT="${TRAIN_CAPTURE_CDP_PORT:-9333}"
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
AUTO_SERVER=1

usage() {
  cat <<'USAGE'
Usage: scripts/export-train-journey.sh [options]

Exports the auto-mode train journey to a 1280x720 MP4 using a headless Chrome
viewport capture plus the page's Web Audio output.

Options:
  --url URL          Page URL to record. Default: http://localhost:8000/
  --duration SEC    Capture duration in seconds. Default: 458
  --out FILE        Output MP4 path. Default: exports/train-journey-screen-record.mp4
  --cdp-port PORT   Chrome DevTools port. Default: 9333
  --chrome PATH     Chrome binary path.
  --no-server       Do not auto-start python3 -m http.server if URL is down.
  -h, --help        Show this help text.

Examples:
  scripts/export-train-journey.sh
  scripts/export-train-journey.sh --duration 10 --out exports/smoke.mp4
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --url)
      if [[ $# -lt 2 ]]; then echo "--url requires a value" >&2; exit 2; fi
      URL="$2"
      shift 2
      ;;
    --duration|--seconds)
      if [[ $# -lt 2 ]]; then echo "$1 requires a value" >&2; exit 2; fi
      DURATION="$2"
      shift 2
      ;;
    --out|--output)
      if [[ $# -lt 2 ]]; then echo "$1 requires a value" >&2; exit 2; fi
      OUTPUT="$2"
      shift 2
      ;;
    --cdp-port)
      if [[ $# -lt 2 ]]; then echo "--cdp-port requires a value" >&2; exit 2; fi
      CDP_PORT="$2"
      shift 2
      ;;
    --chrome)
      if [[ $# -lt 2 ]]; then echo "--chrome requires a value" >&2; exit 2; fi
      CHROME="$2"
      shift 2
      ;;
    --no-server)
      AUTO_SERVER=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

url_ok() {
  curl -fsS --head --max-time 2 "$URL" >/dev/null 2>&1 ||
    curl -fsS --max-time 2 "$URL" >/dev/null 2>&1
}

url_port() {
  node -e 'const u = new URL(process.argv[1]); console.log(u.port || (u.protocol === "https:" ? "443" : "80"));' "$URL"
}

is_local_url() {
  node -e 'const h = new URL(process.argv[1]).hostname; process.exit(["localhost", "127.0.0.1", "::1"].includes(h) ? 0 : 1);' "$URL"
}

cleanup_server() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}

require_cmd node
require_cmd ffmpeg
require_cmd ffprobe
require_cmd curl

if ! node -e 'const n = Number(process.argv[1]); process.exit(Number.isFinite(n) && n > 0 ? 0 : 1);' "$DURATION"; then
  echo "Duration must be a positive number of seconds: $DURATION" >&2
  exit 2
fi

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome was not found at: $CHROME" >&2
  echo "Pass --chrome PATH or set CHROME_PATH." >&2
  exit 1
fi

if ! url_ok; then
  if [[ "$AUTO_SERVER" == "1" ]] && is_local_url; then
    require_cmd python3
    PORT="$(url_port)"
    echo "Starting local server on port $PORT"
    python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/train-journey-export-server.log 2>&1 &
    SERVER_PID="$!"
    trap cleanup_server EXIT
    for _ in {1..40}; do
      if url_ok; then break; fi
      sleep 0.25
    done
  fi
fi

if ! url_ok; then
  echo "Could not reach $URL" >&2
  echo "Start a local server first, or omit --no-server for localhost exports." >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

echo "Exporting $URL"
echo "Duration: ${DURATION}s"
echo "Output: $OUTPUT"

TRAIN_CAPTURE_URL="$URL" \
TRAIN_CAPTURE_SECONDS="$DURATION" \
TRAIN_CAPTURE_OUTPUT="$OUTPUT" \
TRAIN_CAPTURE_CDP_PORT="$CDP_PORT" \
CHROME_PATH="$CHROME" \
node scripts/screen-record-auto-video.mjs

echo
ffprobe -v error \
  -show_entries format=duration,size \
  -show_entries stream=index,codec_type,codec_name,width,height,pix_fmt,channels,avg_frame_rate \
  -of default=noprint_wrappers=1 "$OUTPUT"
