#!/bin/bash
# Upload audio files to Oracle Object Storage via PAR (Pre-Authenticated Request).
# Uses only curl — no OCI CLI or SDK needed.
#
# Usage:
#   bash scripts/upload-audio-par.sh [--dry-run]
#
# Run from the repo root, or set AUDIO_DIR to the directory containing audio folders.

PAR_URL="https://objectstorage.il-jerusalem-1.oraclecloud.com/p/SXclc2gUspdchyA3Kvsp8aYo3O-fDqqIR-TyDUMGwOCSnajXkbJyVTfwot2wPx_e/n/axnsxk4cnhih/b/hebrew-audio-files/o/"

# Audio source directory — default is public/audio relative to script location
AUDIO_DIR="${AUDIO_DIR:-$(cd "$(dirname "$0")/../public/audio" 2>/dev/null && pwd)}"

DRY_RUN=false
[ "$1" = "--dry-run" ] && DRY_RUN=true

if [ ! -d "$AUDIO_DIR" ]; then
  echo "Audio directory not found: $AUDIO_DIR"
  echo "Set AUDIO_DIR to the directory containing your audio folders (letters/, vowels/, etc.)"
  echo "Example: AUDIO_DIR=~/HebrewByClaude/public/audio bash scripts/upload-audio-par.sh"
  exit 1
fi

echo ""
echo "=== Oracle Object Storage Upload (PAR) ==="
echo "Source: $AUDIO_DIR"
echo ""

OK=0
FAIL=0
TOTAL=0

while IFS= read -r -d '' file; do
  # Relative path from audio dir (e.g., letters/alef.mp3)
  object_name="${file#$AUDIO_DIR/}"
  TOTAL=$((TOTAL + 1))
  size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)

  if $DRY_RUN; then
    echo "  [DRY RUN] $object_name ($size bytes)"
    OK=$((OK + 1))
    continue
  fi

  # Upload via PUT to PAR URL + object name
  http_code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X PUT \
    --data-binary "@$file" \
    -H "Content-Type: audio/mpeg" \
    "${PAR_URL}${object_name}")

  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ] || [ "$http_code" = "204" ]; then
    echo "  OK    $object_name ($size bytes)"
    OK=$((OK + 1))
  else
    echo "  FAIL  $object_name (HTTP $http_code)"
    FAIL=$((FAIL + 1))
  fi
done < <(find "$AUDIO_DIR" -name "*.mp3" -type f -print0 | sort -z)

echo ""
echo "Done! Total: $TOTAL | Uploaded: $OK | Failed: $FAIL"

if [ $OK -gt 0 ] && ! $DRY_RUN; then
  echo ""
  echo "Bucket URL for NEXT_PUBLIC_AUDIO_BASE_URL:"
  echo "  https://objectstorage.il-jerusalem-1.oraclecloud.com/n/axnsxk4cnhih/b/hebrew-audio-files/o"
fi
