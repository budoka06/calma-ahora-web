import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import BackButton from '@/components/BackButton';
import { Volume2, VolumeX } from 'lucide-react';

const obtenerInstrucciones = (tecnica: string) => {
  switch (tecnica) {
    case 'Respiración 4-6':
      return {
        titulo: 'Respiración 4-6',
        descripcion: 'Activa el nervio vago y relaja el cuerpo rápidamente. Ideal para ansiedad leve o nervios momentáneos.',
        pasos: [
          'Inhala por la nariz contando hasta 4',
          'Exhala por la boca contando hasta 6',
          'No hagas pausas entre inhalación y exhalación',
          'Repite el ciclo sintiendo cómo tu cuerpo se relaja'
        ],
        duraciones: [4, 6],
        tiempoCiclo: 10000
      };
    case 'Respiración Cuadrada':
      return {
        titulo: 'Respiración Cuadrada (Box Breathing)',
        descripcion: 'Estabiliza mente y cuerpo, genera enfoque y control. Ideal para crisis de ansiedad o pensamientos acelerados.',
        pasos: [
          'Inhala por la nariz contando hasta 4',
          'Retén el aire contando hasta 4',
          'Exhala por la boca contando hasta 4',
          'Mantén vacío contando hasta 4',
          'Repite el ciclo completo'
        ],
        duraciones: [4, 4, 4, 4],
        tiempoCiclo: 16000
      };
    case 'Respiración 4-7-8':
      return {
        titulo: 'Respiración 4-7-8',
        descripcion: 'Profunda sedación del sistema nervioso. Ideal para momentos de mucha tensión o insomnio.',
        pasos: [
          'Inhala por la nariz contando hasta 4',
          'Retén el aire contando hasta 7',
          'Exhala por la boca contando hasta 8',
          'Repite el ciclo hasta sentir calma profunda'
        ],
        duraciones: [4, 7, 8],
        tiempoCiclo: 19000
      };
    case 'Respiración Coherente (5-5)':
      return {
        titulo: 'Respiración Coherente (5-5)',
        descripcion: 'Sincroniza corazón y respiración, crea equilibrio emocional. Ideal para práctica diaria o estados de estrés constante.',
        pasos: [
          'Inhala suavemente por la nariz contando hasta 5',
          'Exhala lentamente por la boca contando hasta 5',
          'Mantén un ritmo constante y suave',
          'Repite sintiendo el equilibrio en tu cuerpo'
        ],
        duraciones: [5, 5],
        tiempoCiclo: 10000
      };
    case 'Suspiro Fisiológico':
      return {
        titulo: 'Suspiro Fisiológico Doble (Stanford)',
        descripcion: 'Libera CO₂ y baja ansiedad en menos de un minuto. Ideal cuando hay sensación de ahogo o presión torácica.',
        pasos: [
          'Haz una inhalación corta por la nariz',
          'Inmediatamente haz otra inhalación corta',
          'Exhala lentamente y completamente por la boca',
          'Repite 2-3 veces para alivio inmediato'
        ],
        duraciones: [1, 1, 6],
        tiempoCiclo: 8000
      };
    default:
      return {
        titulo: 'Respiración Coherente (5-5)',
        descripcion: 'Sincroniza corazón y respiración, crea equilibrio emocional.',
        pasos: [
          'Inhala suavemente por la nariz contando hasta 5',
          'Exhala lentamente por la boca contando hasta 5',
          'Repite este ciclo sintiendo la paz en cada respiración'
        ],
        duraciones: [5, 5],
        tiempoCiclo: 10000
      };
  }
};

const obtenerMensajePersonalizado = (perfil: number): string => {
  const mensajes: { [key: number]: string } = {
    1: 'Eres una persona con fortaleza y liderazgo. Toma el control de tu respiración y recupera tu centro.',
    2: 'Tu naturaleza empática te permite buscar armonía. Respira profundamente y siente la paz que compartes con el mundo.',
    3: 'Tu creatividad florece en la calma. Cada respiración alimenta tu expresión auténtica.',
    4: 'Tu estabilidad es tu fundamento. Respira y reconecta con tu centro de equilibrio.',
    5: 'Tu espíritu aventurero necesita momentos de calma. Respira y encuentra tu centro en medio del movimiento.',
    6: 'Tu compasión es tu regalo. Al calmarte, recargas esa energía amorosa que compartes.',
    7: 'Aprovecha tu profundidad interior: cada respiración te ayuda a aclarar tu mente y encontrar respuestas.',
    8: 'Tu poder personal se fortalece en la calma. Respira y reconecta con tu fuerza interior.',
    9: 'Tu empatía es tu fuerza. Al calmarte, recargas esa energía positiva que compartes con los demás.'
  };
  
  return mensajes[perfil] || 'Respira profundamente y encuentra tu paz interior.';
};

const RespiracionGuiada = () => {
  const navigate = useNavigate();
  const { tecnicaElegida, perfilNumerologico } = useAppContext();
  const [fase, setFase] = useState(0);
  const [escala, setEscala] = useState(1);
  const [audioMuted, setAudioMuted] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const instrucciones = obtenerInstrucciones(tecnicaElegida);
  const mensajePersonalizado = obtenerMensajePersonalizado(perfilNumerologico);

  const iniciarRespiracion = () => {
    setIniciado(true);
    
    // Configurar música
    const musicMap: Record<string, { url: string; volume: number }> = {
      'Respiración 4-6': { 
        url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_1808fbf07a.mp3',
        volume: 0.25 
      },
      'Respiración Cuadrada': { 
        url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
        volume: 0.22 
      },
      'Respiración 4-7-8': { 
        url: 'https://cdn.pixabay.com/audio/2023/02/28/audio_c7bc8c2e55.mp3',
        volume: 0.20 
      },
      'Respiración Coherente (5-5)': { 
        url: 'https://cdn.pixabay.com/audio/2024/02/20/audio_c8cc1a7eaa.mp3',
        volume: 0.24 
      },
      'Suspiro Fisiológico': { 
        url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_1808fbf07a.mp3',
        volume: 0.26 
      },
    };

    const cfg = musicMap[tecnicaElegida] || { 
      url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_1808fbf07a.mp3', 
      volume: 0.25 
    };

    const audio = new Audio(cfg.url);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0;

    // Iniciar reproducción (garantizado por interacción del usuario)
    audio.play().then(() => {
      console.log('Audio iniciado correctamente');
      // Fade in
      const step = 0.05;
      const target = cfg.volume;
      const fadeIn = setInterval(() => {
        if (!audioRef.current || audioRef.current !== audio) {
          clearInterval(fadeIn);
          return;
        }
        if (audio.volume < target - 0.01) {
          audio.volume = Math.min(target, audio.volume + step);
        } else {
          clearInterval(fadeIn);
        }
      }, 80);
    }).catch(error => {
      console.error('Error al iniciar audio:', error);
    });
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.src = '';
        } catch {}
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!iniciado) return;
    
    const instrucciones = obtenerInstrucciones(tecnicaElegida);
    const numFases = instrucciones.duraciones.length;
    
    const interval = setInterval(() => {
      setFase((prev) => (prev + 1) % numFases);
    }, instrucciones.tiempoCiclo / numFases);

    return () => clearInterval(interval);
  }, [tecnicaElegida, iniciado]);

  useEffect(() => {
    const instrucciones = obtenerInstrucciones(tecnicaElegida);
    const duraciones = instrucciones.duraciones;
    
    // Determine scale based on breathing phase
    // Even phases (0, 2, 4...) are typically inhale/hold, odd phases are exhale
    if (fase === 0 || (duraciones.length === 4 && (fase === 0 || fase === 1))) {
      setEscala(1.5); // Expand on inhale/hold
    } else {
      setEscala(1); // Contract on exhale
    }
  }, [fase, tecnicaElegida]);

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioMuted;
      setAudioMuted(!audioMuted);
    }
  };

  const handleFinalizar = () => {
    navigate('/feedback');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4 flex items-center justify-center">
      <BackButton />
      
      {iniciado && (
        <Button
          onClick={toggleAudio}
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-md"
          aria-label={audioMuted ? "Activar audio" : "Silenciar audio"}
        >
          {audioMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      )}

      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-calma-ocean">{instrucciones.titulo}</h1>
          <p className="text-lg text-calma-ocean/80">{instrucciones.descripcion}</p>
        </div>

        {!iniciado ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6 text-center">
            <div className="space-y-4">
              <p className="text-calma-ocean text-lg">
                Prepárate para comenzar tu práctica de respiración
              </p>
              <ul className="text-calma-ocean/70 space-y-2 text-left max-w-md mx-auto">
                <li>✓ Busca un lugar tranquilo</li>
                <li>✓ Siéntate o acuéstate cómodamente</li>
                <li>✓ Activa el audio de tu dispositivo</li>
                <li>✓ Respira naturalmente antes de comenzar</li>
              </ul>
            </div>
            
            <Button
              onClick={iniciarRespiracion}
              size="lg"
              className="w-full h-16 text-xl bg-gradient-primary hover:opacity-90"
            >
              Comenzar Respiración
            </Button>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-8">
          <div className="flex justify-center">
            <div
              className="w-48 h-48 rounded-full bg-gradient-primary transition-transform duration-[4000ms] ease-in-out shadow-glow"
              style={{ transform: `scale(${escala})` }}
            />
          </div>

          <div className="space-y-4">
            {instrucciones.pasos.map((paso, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {index + 1}
                </span>
                <p className="text-calma-ocean pt-1">{paso}</p>
              </div>
            ))}
          </div>

          <div className="bg-calma-sand/30 rounded-2xl p-6 border-l-4 border-calma-ocean">
            <p className="text-sm italic text-calma-ocean/80">
              💫 {mensajePersonalizado}
            </p>
          </div>

            <Button
              onClick={handleFinalizar}
              size="lg"
              className="w-full h-14 text-lg"
            >
              He Terminado
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RespiracionGuiada;
