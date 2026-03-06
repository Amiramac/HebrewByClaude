const AUDIO_BASE_URL = process.env.NEXT_PUBLIC_AUDIO_BASE_URL || '';

/**
 * Resolve an audio path like '/audio/letters/alef.mp3' to the actual URL.
 * When NEXT_PUBLIC_AUDIO_BASE_URL is set (e.g. Oracle Object Storage bucket),
 * replaces the '/audio' prefix with the base URL, preserving the folder structure.
 * When not set, returns the path as-is (served from public/audio/).
 */
export function resolveAudioUrl(src: string): string {
  if (!AUDIO_BASE_URL) return src;
  return `${AUDIO_BASE_URL}${src.replace(/^\/audio/, '')}`;
}
