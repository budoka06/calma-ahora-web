import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { Wind, Brain, Moon, Heart, Zap } from 'lucide-react';
import BackButton from '@/components/BackButton';

const tecnicasRespiracion = [
  {
    nombre: 'Respiración 4-6',
    icono: Wind,
    descripcion: 'Activa el nervio vago y relaja el cuerpo rápidamente',
    cuando: 'Ansiedad leve o nervios momentáneos',
    duracion: '10 segundos por ciclo',
    gradient: 'from-calma-mint to-calma-ocean'
  },
  {
    nombre: 'Respiración Cuadrada',
    icono: Brain,
    descripcion: 'Estabiliza mente y cuerpo, genera enfoque y control',
    cuando: 'Crisis de ansiedad o pensamientos acelerados',
    duracion: '16 segundos por ciclo',
    gradient: 'from-calma-lavender to-calma-ocean'
  },
  {
    nombre: 'Respiración 4-7-8',
    icono: Moon,
    descripcion: 'Profunda sedación del sistema nervioso',
    cuando: 'Momentos de mucha tensión o insomnio',
    duracion: '19 segundos por ciclo',
    gradient: 'from-calma-coral to-calma-ocean'
  },
  {
    nombre: 'Respiración Coherente (5-5)',
    icono: Heart,
    descripcion: 'Sincroniza corazón y respiración, equilibrio emocional',
    cuando: 'Práctica diaria o estrés constante',
    duracion: '10 segundos por ciclo',
    gradient: 'from-calma-mint to-calma-lavender'
  },
  {
    nombre: 'Suspiro Fisiológico',
    icono: Zap,
    descripcion: 'Libera CO₂ y baja ansiedad en menos de un minuto',
    cuando: 'Sensación de ahogo o presión torácica',
    duracion: '8 segundos por ciclo',
    gradient: 'from-calma-coral to-calma-mint'
  }
];

const SelectorRespiracion = () => {
  const navigate = useNavigate();
  const { setTecnicaElegida } = useAppContext();

  const handleSeleccionar = (nombreTecnica: string) => {
    setTecnicaElegida(nombreTecnica);
    navigate('/respiracion-guiada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-6xl mx-auto pt-8 pb-16 space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-calma-ocean">
            Elige tu Técnica de Respiración
          </h1>
          <p className="text-lg text-calma-ocean/70 max-w-2xl mx-auto">
            Cada técnica está diseñada para ayudarte en diferentes situaciones emocionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tecnicasRespiracion.map((tecnica) => {
            const Icono = tecnica.icono;
            return (
              <Card
                key={tecnica.nombre}
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-calma-ocean/10 hover:border-calma-ocean/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tecnica.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icono className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-calma-ocean mb-2">
                      {tecnica.nombre}
                    </h3>
                    <p className="text-sm text-calma-ocean/80 mb-3">
                      {tecnica.descripcion}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-calma-ocean">Cuándo usar:</span>
                      <span className="text-calma-ocean/70">{tecnica.cuando}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-calma-ocean">Duración:</span>
                      <span className="text-calma-ocean/70">{tecnica.duracion}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSeleccionar(tecnica.nombre)}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    Comenzar
                  </Button>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${tecnica.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground italic">
            💡 Tip: Practica diferentes técnicas para descubrir cuál funciona mejor para ti
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectorRespiracion;
