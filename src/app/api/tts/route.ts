import { NextRequest, NextResponse } from 'next/server';

const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Arabella

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'TTS failed' }, { status: 502 });
  }

  const audioBuffer = await response.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: { 'Content-Type': 'audio/mpeg' },
  });
}
