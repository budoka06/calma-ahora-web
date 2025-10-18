import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import BackButton from '@/components/BackButton';
import { Volume2, VolumeX } from 'lucide-react';

interface MeditacionConfig {
  titulo: string;
  descripcion: string;
  pasos: string[];
  musicUrl?: string;
  voz: {
    rate: number;
    pitch: number;
  };
}

const configuracionesMeditacion: Record<string, MeditacionConfig> = {
  feliz: {
    titulo: 'Meditación de Alegría',
    descripcion: 'Expande y celebra tu felicidad con gratitud y presencia.',
    pasos: [
      'Recuerda un momento que te hizo sonreír.',
      'Siente en qué parte de tu cuerpo está esa alegría.',
      'Deja que esa sensación se expanda como una luz dorada.',
      'Agradece por este instante de felicidad.'
    ],
    voz: { rate: 1.0, pitch: 1.1 }
  },
  tranquilo: {
    titulo: 'Meditación de Calma',
    descripcion: 'Profundiza tu serenidad y encuentra paz interior.',
    pasos: [
      'Cierra los ojos y respira lentamente.',
      'Imagina un lago en calma, el agua refleja el cielo.',
      'Inhala paz, exhala tensión.',
      'Siente cómo la calma se expande por todo tu cuerpo.',
      'Quédate respirando serenamente.'
    ],
    voz: { rate: 0.8, pitch: 1.0 }
  },
  ansioso: {
    titulo: 'Meditación para la Ansiedad',
    descripcion: 'Regresa al presente y encuentra tu centro de equilibrio.',
    pasos: [
      'Encuentra una postura cómoda.',
      'Inhala 4 segundos, retén 4, exhala 4, espera 4. Repite.',
      'Lleva tu atención al cuerpo y siente dónde está la ansiedad.',
      'Di mentalmente: Reconozco mi ansiedad, pero no me define.',
      'Siente cómo tu respiración disuelve esa tensión.',
      'Permanece unos segundos en silencio.'
    ],
    voz: { rate: 0.9, pitch: 0.95 }
  },
  triste: {
    titulo: 'Meditación de Compasión',
    descripcion: 'Abraza tu tristeza con ternura y autocompasión.',
    pasos: [
      'Respira lento. Lleva atención a tu pecho.',
      'Reconoce la tristeza sin huir de ella.',
      'Imagina que estás sentado junto a un río y dejas fluir lo que sientes.',
      'Coloca una mano sobre tu corazón. Dite: Me ofrezco compasión.',
      'Agradece este momento de autoconocimiento.'
    ],
    voz: { rate: 0.85, pitch: 0.9 }
  },
  enojado: {
    titulo: 'Meditación de Transformación',
    descripcion: 'Transforma tu enojo en claridad y fuerza consciente.',
    pasos: [
      'Inhala profundo, exhala largo.',
      'Ubica dónde sientes la ira en tu cuerpo.',
      'Di: Esta es mi ira. La observo sin dejar que me controle.',
      'Imagina esa energía transformándose en luz dorada.',
      'Permite que esa luz te llene de claridad.'
    ],
    voz: { rate: 0.9, pitch: 0.85 }
  }
};

const MeditacionGuiada = () => {
  const navigate = useNavigate();
  const { emocionInicial, setTecnicaElegida } = useAppContext();
  const [iniciada, setIniciada] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [finalizada, setFinalizada] = useState(false);
  const [escala, setEscala] = useState(1);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const config = configuracionesMeditacion[emocionInicial] || configuracionesMeditacion.tranquilo;

  useEffect(() => {
    // Efecto de respiración del círculo
    if (iniciada && !finalizada) {
      const interval = setInterval(() => {
        setEscala(prev => prev === 1 ? 1.5 : 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [iniciada, finalizada]);

  const iniciarMeditacion = () => {
    setIniciada(true);
    setTecnicaElegida(config.titulo);
    
    // Iniciar audio de fondo (fade-in)
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.3) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }
    
    // Narrar primer paso
    narrarPaso(0);
  };

  const narrarPaso = (index: number) => {
    if ('speechSynthesis' in window) {
      // Cancelar narración anterior si existe
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(config.pasos[index]);
      utterance.lang = 'es-ES';
      utterance.rate = config.voz.rate;
      utterance.pitch = config.voz.pitch;
      utterance.volume = audioMuted ? 0 : 1;
      
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const siguientePaso = () => {
    if (pasoActual < config.pasos.length - 1) {
      const siguiente = pasoActual + 1;
      setPasoActual(siguiente);
      narrarPaso(siguiente);
    } else {
      finalizarMeditacion();
    }
  };

  const finalizarMeditacion = () => {
    setFinalizada(true);
    
    // Fade-out del audio
    if (audioRef.current) {
      let vol = audioRef.current.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(fadeOut);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
      }, 100);
    }
    
    // Cancelar narración
    window.speechSynthesis.cancel();
  };

  const toggleAudio = () => {
    setAudioMuted(!audioMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioMuted;
    }
  };

  const continuarAlFeedback = () => {
    navigate('/feedback');
  };

  useEffect(() => {
    return () => {
      // Limpieza al desmontar
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!iniciada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4 flex items-center justify-center">
        <BackButton />
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-calma-ocean">{config.titulo}</h1>
            <p className="text-lg text-calma-ocean/80">{config.descripcion}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-calma-ocean text-center">
                Prepárate para esta experiencia
              </h3>
              <div className="space-y-3 text-calma-ocean/80">
                <p>✨ Encuentra un lugar tranquilo</p>
                <p>🎧 Usa auriculares si es posible</p>
                <p>🪑 Siéntate en una postura cómoda</p>
                <p>🌬️ Respira naturalmente</p>
              </div>
            </div>

            <Button
              onClick={iniciarMeditacion}
              size="lg"
              className="w-full h-14 text-lg"
            >
              Iniciar Meditación
            </Button>
          </div>
        </div>

        {/* Audio de fondo - Nota: Agregar archivos de audio reales */}
        <audio ref={audioRef} loop>
          {/* Aquí se pueden agregar diferentes fuentes de audio según la emoción */}
          {/* <source src="/sounds/calm-ambient.mp3" type="audio/mpeg" /> */}
        </audio>
      </div>
    );
  }

  if (finalizada) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-12 space-y-8 text-center">
            <div className="text-6xl mb-6">🌿</div>
            <h1 className="text-3xl font-bold text-calma-ocean">
              Gracias por este momento
            </h1>
            <p className="text-xl text-calma-ocean/80">
              Respira… y continúa con serenidad.
            </p>
            
            <div className="pt-6">
              <Button
                onClick={continuarAlFeedback}
                size="lg"
                className="h-14 px-12 text-lg"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4 flex items-center justify-center">
      <BackButton />
      
      {/* Control de audio */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 bg-white/90 rounded-full shadow-elegant hover:scale-105 transition-transform"
      >
        {audioMuted ? (
          <VolumeX className="w-6 h-6 text-calma-ocean" />
        ) : (
          <Volume2 className="w-6 h-6 text-calma-ocean" />
        )}
      </button>

      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-8">
          {/* Indicador de progreso */}
          <div className="flex items-center justify-center gap-2">
            {config.pasos.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === pasoActual
                    ? 'w-12 bg-gradient-primary'
                    : index < pasoActual
                    ? 'w-2 bg-calma-ocean'
                    : 'w-2 bg-calma-sand'
                }`}
              />
            ))}
          </div>

          {/* Círculo de respiración animado */}
          <div className="flex justify-center py-8">
            <div
              className="w-40 h-40 rounded-full bg-gradient-primary transition-all duration-[4000ms] ease-in-out shadow-glow"
              style={{ transform: `scale(${escala})` }}
            />
          </div>

          {/* Texto del paso actual */}
          <div className="text-center space-y-4">
            <p className="text-sm text-calma-ocean/60 font-medium">
              Paso {pasoActual + 1} de {config.pasos.length}
            </p>
            <h2 className="text-2xl font-semibold text-calma-ocean px-4 min-h-[80px] flex items-center justify-center">
              {config.pasos[pasoActual]}
            </h2>
          </div>

          {/* Botón siguiente paso */}
          <div className="pt-4">
            <Button
              onClick={siguientePaso}
              size="lg"
              className="w-full h-14 text-lg"
            >
              {pasoActual < config.pasos.length - 1 ? 'Siguiente Paso' : 'Finalizar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Audio de fondo */}
      <audio ref={audioRef} loop>
        {/* Agregar fuentes de audio según emoción */}
      </audio>
    </div>
  );
};

export default MeditacionGuiada;
