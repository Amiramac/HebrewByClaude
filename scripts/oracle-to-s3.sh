#!/bin/bash
# Transfer audio files from Oracle Object Storage to AWS S3.
# Downloads from public Oracle bucket, uploads to S3 via aws cli.
#
# Usage: bash scripts/oracle-to-s3.sh

ORACLE_BASE="https://objectstorage.il-jerusalem-1.oraclecloud.com/n/axnsxk4cnhih/b/hebrew-audio-files/o"
S3_BUCKET="s3://hebrew-app-audio"
TMP_DIR="/tmp/hebrew-audio-transfer"

# All known audio files (from generate-audio.ts)
FILES=(
  # Letters (22)
  letters/alef.mp3 letters/shin.mp3 letters/lamed.mp3 letters/mem.mp3 letters/bet.mp3
  letters/dalet.mp3 letters/he.mp3 letters/yod.mp3 letters/tav.mp3 letters/resh.mp3
  letters/chet.mp3 letters/kaf.mp3 letters/nun.mp3 letters/ayin.mp3 letters/pe.mp3
  letters/gimel.mp3 letters/zayin.mp3 letters/vav.mp3
  letters/tet.mp3 letters/samekh.mp3 letters/kuf.mp3 letters/tsadi.mp3

  # Vowels (9)
  vowels/kamatz.mp3 vowels/patach.mp3 vowels/chirik.mp3 vowels/segol.mp3
  vowels/tzereh.mp3 vowels/cholam.mp3 vowels/kubutz.mp3 vowels/shuruk.mp3 vowels/shva.mp3

  # Syllables - kamatz (10)
  syllables/ba.mp3 syllables/sha.mp3 syllables/la.mp3 syllables/ma.mp3 syllables/a.mp3
  syllables/da.mp3 syllables/ha.mp3 syllables/ya.mp3 syllables/ta.mp3 syllables/ra.mp3

  # Syllables - chirik (8)
  syllables/bi.mp3 syllables/shi.mp3 syllables/li.mp3 syllables/mi.mp3
  syllables/di.mp3 syllables/ti.mp3 syllables/ri.mp3 syllables/hi.mp3

  # Syllables - segol (8)
  syllables/be.mp3 syllables/me.mp3 syllables/le.mp3 syllables/she.mp3
  syllables/de.mp3 syllables/re.mp3 syllables/he2.mp3 syllables/te.mp3

  # Words (15)
  words/ima.mp3 words/aba.mp3 words/bayit.mp3 words/yad.mp3 words/dag.mp3
  words/shalom.mp3 words/yeled.mp3 words/yalda.mp3 words/sefer.mp3 words/kelev.mp3
  words/chatul.mp3 words/mayim.mp3 words/lechem.mp3 words/shemesh.mp3 words/yareach.mp3

  # UI (4)
  ui/correct.mp3 ui/encourage.mp3 ui/celebrate.mp3 ui/tap.mp3

  # Narration (15)
  narration/welcome.mp3 narration/tap-the-letter.mp3 narration/listen-and-choose.mp3
  narration/match-pairs.mp3 narration/first-vowel.mp3 narration/great-job.mp3
  narration/level-complete.mp3 narration/find-with-kamatz.mp3
  narration/listen-choose-syllable.mp3 narration/hear-find-letter.mp3
  narration/build-words.mp3 narration/match-syllable-pairs.mp3
  narration/find-with-chirik.mp3 narration/find-with-segol.mp3 narration/hear-find-word.mp3

  # Feedback (22)
  feedback/alef-wrong.mp3 feedback/shin-wrong.mp3 feedback/lamed-wrong.mp3
  feedback/mem-wrong.mp3 feedback/bet-wrong.mp3 feedback/dalet-wrong.mp3
  feedback/he-wrong.mp3 feedback/yod-wrong.mp3 feedback/tav-wrong.mp3
  feedback/resh-wrong.mp3 feedback/chet-wrong.mp3 feedback/kaf-wrong.mp3
  feedback/nun-wrong.mp3 feedback/ayin-wrong.mp3 feedback/pe-wrong.mp3
  feedback/gimel-wrong.mp3 feedback/zayin-wrong.mp3 feedback/vav-wrong.mp3
  feedback/tet-wrong.mp3 feedback/samekh-wrong.mp3 feedback/kuf-wrong.mp3
  feedback/tsadi-wrong.mp3

  # Identify - masculine (22)
  identify/alef.mp3 identify/shin.mp3 identify/lamed.mp3 identify/mem.mp3
  identify/bet.mp3 identify/dalet.mp3 identify/he.mp3 identify/yod.mp3
  identify/tav.mp3 identify/resh.mp3 identify/chet.mp3 identify/kaf.mp3
  identify/nun.mp3 identify/ayin.mp3 identify/pe.mp3 identify/gimel.mp3
  identify/zayin.mp3 identify/vav.mp3 identify/tet.mp3 identify/samekh.mp3
  identify/kuf.mp3 identify/tsadi.mp3

  # Identify - feminine (22)
  identify-f/alef.mp3 identify-f/shin.mp3 identify-f/lamed.mp3 identify-f/mem.mp3
  identify-f/bet.mp3 identify-f/dalet.mp3 identify-f/he.mp3 identify-f/yod.mp3
  identify-f/tav.mp3 identify-f/resh.mp3 identify-f/chet.mp3 identify-f/kaf.mp3
  identify-f/nun.mp3 identify-f/ayin.mp3 identify-f/pe.mp3 identify-f/gimel.mp3
  identify-f/zayin.mp3 identify-f/vav.mp3 identify-f/tet.mp3 identify-f/samekh.mp3
  identify-f/kuf.mp3 identify-f/tsadi.mp3
)

echo ""
echo "=== Oracle → S3 Audio Transfer ==="
echo "Files: ${#FILES[@]}"
echo ""

# Download from Oracle
echo "--- Downloading from Oracle ---"
OK_DL=0
FAIL_DL=0

for f in "${FILES[@]}"; do
  dir="$TMP_DIR/$(dirname "$f")"
  mkdir -p "$dir"
  http_code=$(curl -s -o "$TMP_DIR/$f" -w "%{http_code}" "$ORACLE_BASE/$f")
  if [ "$http_code" = "200" ]; then
    echo "  DL OK  $f"
    OK_DL=$((OK_DL + 1))
  else
    echo "  DL FAIL  $f (HTTP $http_code)"
    rm -f "$TMP_DIR/$f"
    FAIL_DL=$((FAIL_DL + 1))
  fi
done

echo ""
echo "Downloaded: $OK_DL | Failed: $FAIL_DL"
echo ""

# Upload to S3
echo "--- Uploading to S3 ---"
aws s3 sync "$TMP_DIR" "$S3_BUCKET" --content-type "audio/mpeg"

echo ""
echo "Done! Verifying..."
aws s3 ls "$S3_BUCKET" --recursive --summarize | tail -3

# Cleanup
rm -rf "$TMP_DIR"
