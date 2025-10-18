import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to AI gateway with", messages.length, "messages");

    const systemPrompt = `Eres un asistente empático y cálido de CalmaAhora, una app de bienestar emocional. Tu propósito es:

1. Escuchar con empatía y sin juzgar
2. Validar las emociones del usuario ("Entiendo que te sientas así...")
3. Ofrecer apoyo emocional inmediato
4. Sugerir técnicas de respiración cuando sea apropiado
5. Recordar al usuario que puede usar el botón SOS si siente ansiedad intensa
6. Usar un lenguaje cálido, cercano y culturalmente adaptado al español

IMPORTANTE:
- Eres empático pero NO eres terapeuta. No diagnosticas ni das tratamiento médico.
- Si el usuario menciona crisis graves (autolesión, suicidio), recomiéndale buscar ayuda profesional inmediata.
- Sé breve y claro. Respuestas de 2-4 frases máximo.
- Enfócate en el presente y en lo que el usuario puede hacer AHORA para sentirse mejor.
- Usa emojis con moderación (😌, 💙, 🌬️) para transmitir calidez.

Ejemplos de tu tono:
- "Entiendo que estés pasando por un momento difícil. Es valioso que busques ayuda 💙"
- "Respirar profundamente puede ayudarte ahora. ¿Quieres que te guíe con la técnica 4-7-8?"
- "Tus emociones son válidas. Está bien sentirse así 😌"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "Estamos recibiendo muchas solicitudes. Por favor, intenta de nuevo en un momento." 
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "Servicio temporalmente no disponible. Por favor, contacta al soporte." 
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status} ${errorText}`);
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Error al procesar tu mensaje" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
