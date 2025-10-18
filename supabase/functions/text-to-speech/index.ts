import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, emotion } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not configured');
    }

    // Voces de ElevenLabs optimizadas para meditación - voces suaves y calmadas
    const voiceMap: Record<string, string> = {
      feliz: 'pFZP5JQG7iQjIQuC4Bku',      // Lily - voz suave y cálida
      tranquilo: 'EXAVITQu4vr4xnSDxMaL',  // Sarah - voz serena
      ansioso: 'XB0fDUnXU5powFXDhCwa',    // Charlotte - voz calmada
      triste: 'pFZP5JQG7iQjIQuC4Bku',     // Lily - voz compasiva
      enojado: 'SAz9YHcvj6GT2YYXdXww',    // River - voz equilibrada
    };

    const voiceId = voiceMap[emotion] || voiceMap.tranquilo;

    console.log(`Generating speech for emotion: ${emotion} with voice: ${voiceId}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.7,           // Mayor estabilidad para voz más consistente
            similarity_boost: 0.8,    // Mayor similitud con la voz base
            style: 0.3,               // Menos estilo para mantener calma
            use_speaker_boost: true,
            speaking_rate: 0.85,      // Velocidad más lenta
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Convertir audio a base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    console.log('Successfully generated speech');

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Text-to-speech error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
