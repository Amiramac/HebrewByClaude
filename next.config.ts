import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_AUDIO_BASE_URL:
      "https://objectstorage.il-jerusalem-1.oraclecloud.com/n/axnsxk4cnhih/b/hebrew-audio-files/o",
  },
};

export default nextConfig;
