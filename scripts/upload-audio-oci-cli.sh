#!/bin/bash
# Upload audio files to Oracle Object Storage using OCI CLI.
#
# Prerequisites: oci cli configured (`oci setup config`)
#
# Usage:
#   bash scripts/upload-audio-oci-cli.sh [--dry-run]

NAMESPACE="axnsxk4cnhih"
BUCKET="hebrew-audio-files"
AUDIO_DIR="$(cd "$(dirname "$0")/../public/audio" && pwd)"
DRY_RUN=false

if [ "$1" = "--dry-run" ]; then
  DRY_RUN=true
fi

if [ ! -d "$AUDIO_DIR" ]; then
  echo "Audio directory not found: $AUDIO_DIR"
  exit 1
fi

echo "Oracle Object Storage Upload (OCI CLI)"
echo "Namespace: $NAMESPACE"
echo "Bucket:    $BUCKET"
echo "Source:    $AUDIO_DIR"
echo ""

OK=0
FAIL=0

while IFS= read -r -d '' file; do
  # Get relative path from audio dir (e.g., letters/alef.mp3)
  object_name="${file#$AUDIO_DIR/}"

  if $DRY_RUN; then
    echo "  [DRY RUN] $object_name"
    OK=$((OK + 1))
    continue
  fi

  if oci os object put \
    --namespace "$NAMESPACE" \
    --bucket-name "$BUCKET" \
    --name "$object_name" \
    --file "$file" \
    --content-type "audio/mpeg" \
    --force 2>/dev/null; then
    echo "  OK  $object_name"
    OK=$((OK + 1))
  else
    echo "  FAIL  $object_name"
    FAIL=$((FAIL + 1))
  fi
done < <(find "$AUDIO_DIR" -name "*.mp3" -print0 | sort -z)

echo ""
echo "Done! Uploaded: $OK | Failed: $FAIL"

if [ $OK -gt 0 ] && ! $DRY_RUN; then
  echo ""
  echo "Set this env var in your Docker/deployment:"
  echo "  NEXT_PUBLIC_AUDIO_BASE_URL=https://objectstorage.il-jerusalem-1.oraclecloud.com/n/$NAMESPACE/b/$BUCKET/o"
fi
