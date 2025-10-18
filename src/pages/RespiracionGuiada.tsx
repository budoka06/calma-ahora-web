import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const obtenerInstrucciones = (tecnica: string) => {
  switch (tecnica) {
    case 'Respiración 4-7-8':
      return {
        titulo: 'Respiración 4-7-8',
        descripcion: 'Ideal para reducir la ansiedad y encontrar calma rápidamente.',
        pasos: [
          'Inhala lentamente por la nariz mientras cuentas hasta 4',
          'Mantén el aire en tus pulmones contando hasta 7',
          'Exhala suavemente por la boca contando hasta 8',
          'Repite este ciclo varias veces hasta sentir calma'
        ],
        duraciones: [4, 7, 8]
      };
    case 'Respiración 4-4':
      return {
        titulo: 'Respiración 4-4',
        descripcion: 'Perfecta para liberar tensiones y emociones intensas.',
        pasos: [
          'Inhala profundamente por la nariz contando 1-2-3-4',
          'Exhala suavemente por la boca contando 1-2-3-4',
          'Repite este ciclo sintiendo cómo la tensión se libera'
        ],
        duraciones: [4, 4]
      };
    default:
      return {
        titulo: 'Respiración Suave',
        descripcion: 'Mantén y profundiza tu estado de calma.',
        pasos: [
          'Inhala suavemente por la nariz durante 5 segundos',
          'Exhala lentamente por la boca durante 5 segundos',
          'Repite este ciclo sintiendo la paz en cada respiración'
        ],
        duraciones: [5, 5]
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
  
  const instrucciones = obtenerInstrucciones(tecnicaElegida);
  const mensajePersonalizado = obtenerMensajePersonalizado(perfilNumerologico);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (tecnicaElegida === 'Respiración 4-7-8') {
      interval = setInterval(() => {
        setFase((prev) => (prev + 1) % 3);
      }, 6333);
    } else {
      interval = setInterval(() => {
        setFase((prev) => (prev + 1) % 2);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [tecnicaElegida]);

  useEffect(() => {
    if (fase === 0) {
      setEscala(1.5);
    } else if (fase === 1 && tecnicaElegida === 'Respiración 4-7-8') {
      setEscala(1.5);
    } else {
      setEscala(1);
    }
  }, [fase, tecnicaElegida]);

  const handleFinalizar = () => {
    navigate('/feedback');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-calma-ocean">{instrucciones.titulo}</h1>
          <p className="text-lg text-calma-ocean/80">{instrucciones.descripcion}</p>
        </div>

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
      </div>
    </div>
  );
};

export default RespiracionGuiada;
