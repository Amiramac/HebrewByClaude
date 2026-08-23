import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_AUDIO_BASE_URL:
      "https://hebrew-app-audio.s3.eu-west-1.amazonaws.com",
  },
};

export default nextConfig;
