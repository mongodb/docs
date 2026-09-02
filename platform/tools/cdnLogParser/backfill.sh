#!/usr/bin/env bash
#
# Backfill CDN log parser reports for a range of dates, one day per Node
# process (bounds memory and lets each day's process exit cleanly).
#
# Resumable: each successfully processed date is appended to
# .backfill-log, and dates already present there are skipped. Safe to
# re-run after an interruption or a failure.
#
# Usage:
#   ./backfill.sh 2026-04-06 2026-07-27      # explicit start and end (inclusive)
#   ./backfill.sh 2026-04-06                 # start to yesterday
#
# Requires a working .env (AWS creds + valid MONGODB_URI) in this directory.
#
# Memory tuning (production runs with a 32 GB heap; a laptop cannot match
# that, so reduce per-day concurrency instead):
#   NODE_HEAP_MB  Node --max-old-space-size in MB   (default 24576 = 24 GB)
#   BATCH_SIZE    files processed in parallel per day (default 5; prod is 20)

set -uo pipefail
cd "$(dirname "$0")"

NODE_HEAP_MB="${NODE_HEAP_MB:-24576}"
export BATCH_SIZE="${BATCH_SIZE:-5}"

START="${1:?usage: ./backfill.sh START_DATE [END_DATE]}"
END="${2:-$(node -e "const d=new Date();d.setUTCDate(d.getUTCDate()-1);console.log(d.toISOString().split('T')[0]);")}"
LOG=".backfill-log"
touch "$LOG"

echo "Backfilling ${START} through ${END} (inclusive)"

d="$START"
while [[ "$d" < "$END" || "$d" == "$END" ]]; do
  if grep -qxF "$d" "$LOG"; then
    echo "⏭  $d already done, skipping"
  else
    echo "▶️  Processing $d"
    if node --max-old-space-size="$NODE_HEAP_MB" --expose-gc -r ts-node/register \
         parseLogs.ts --start-date="$d"; then
      echo "$d" >> "$LOG"
      echo "✅ $d done"
    else
      echo "❌ $d failed — stopping. Re-run to resume from here."
      exit 1
    fi
  fi
  # advance one day (UTC)
  d="$(node -e "const d=new Date('$d');d.setUTCDate(d.getUTCDate()+1);console.log(d.toISOString().split('T')[0]);")"
done

echo "🎉 Backfill complete: ${START} → ${END}"
