#!/usr/bin/env python3
"""
Upload audio files to Oracle Object Storage with folder structure.

Prerequisites:
  pip install oci

Setup (one of these):
  1. OCI CLI config: Run `oci setup config` to create ~/.oci/config
  2. Instance principal: If running on an OCI VM with dynamic group

Usage:
  python scripts/upload-audio-to-oci.py [--dry-run]

This will upload all files from public/audio/ to the bucket with their
relative paths preserved (e.g., letters/alef.mp3, vowels/kamatz.mp3).
"""

import argparse
import os
import sys

try:
    import oci
except ImportError:
    print("Error: OCI SDK not installed. Run: pip install oci")
    sys.exit(1)

# ── Config ──────────────────────────────────────────────────────
NAMESPACE = "axnsxk4cnhih"
BUCKET_NAME = "hebrew-audio-files"
REGION = "il-jerusalem-1"
LOCAL_AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

def get_object_storage_client():
    """Create OCI Object Storage client from default config."""
    config = oci.config.from_file()
    return oci.object_storage.ObjectStorageClient(config)

def find_audio_files(base_dir):
    """Find all audio files and return (local_path, object_name) pairs."""
    files = []
    for root, _, filenames in os.walk(base_dir):
        for filename in filenames:
            if not filename.endswith(".mp3"):
                continue
            local_path = os.path.join(root, filename)
            # Object name = relative path from audio dir (e.g., "letters/alef.mp3")
            object_name = os.path.relpath(local_path, base_dir)
            files.append((local_path, object_name))
    return sorted(files, key=lambda x: x[1])

def upload_file(client, local_path, object_name, dry_run=False):
    """Upload a single file to the bucket."""
    if dry_run:
        size = os.path.getsize(local_path)
        print(f"  [DRY RUN] {object_name} ({size:,} bytes)")
        return True

    try:
        with open(local_path, "rb") as f:
            client.put_object(
                namespace_name=NAMESPACE,
                bucket_name=BUCKET_NAME,
                object_name=object_name,
                put_object_body=f,
                content_type="audio/mpeg",
            )
        size = os.path.getsize(local_path)
        print(f"  OK  {object_name} ({size:,} bytes)")
        return True
    except Exception as e:
        print(f"  FAIL  {object_name}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Upload audio to Oracle Object Storage")
    parser.add_argument("--dry-run", action="store_true", help="List files without uploading")
    args = parser.parse_args()

    audio_dir = os.path.abspath(LOCAL_AUDIO_DIR)
    if not os.path.isdir(audio_dir):
        print(f"Audio directory not found: {audio_dir}")
        print("Make sure public/audio/ exists with generated audio files.")
        sys.exit(1)

    files = find_audio_files(audio_dir)
    if not files:
        print(f"No .mp3 files found in {audio_dir}")
        sys.exit(1)

    print(f"\nOracle Object Storage Upload")
    print(f"Namespace: {NAMESPACE}")
    print(f"Bucket:    {BUCKET_NAME}")
    print(f"Region:    {REGION}")
    print(f"Source:    {audio_dir}")
    print(f"Files:     {len(files)}")
    if args.dry_run:
        print(f"Mode:      DRY RUN")
    print()

    if not args.dry_run:
        client = get_object_storage_client()
    else:
        client = None

    ok = 0
    fail = 0
    for local_path, object_name in files:
        if upload_file(client, local_path, object_name, dry_run=args.dry_run):
            ok += 1
        else:
            fail += 1

    print(f"\nDone! Uploaded: {ok} | Failed: {fail}")

    if ok > 0 and not args.dry_run:
        base_url = f"https://objectstorage.{REGION}.oraclecloud.com/n/{NAMESPACE}/b/{BUCKET_NAME}/o"
        print(f"\nSet this env var in your Docker/deployment:")
        print(f"  NEXT_PUBLIC_AUDIO_BASE_URL={base_url}")

if __name__ == "__main__":
    main()
