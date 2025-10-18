import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import BackButton from '@/components/BackButton';

const fases = ['Inhala', 'Mantén', 'Exhala', 'Pausa'];

const RespiracionSOS = () => {
  const navigate = useNavigate();
  const { perfilNumerologico } = useAppContext();
  const [faseActual, setFaseActual] = useState(0);
  const [posicionBorde, setPosicionBorde] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFaseActual((prev) => (prev + 1) % 4);
      setPosicionBorde((prev) => (prev + 25) % 100);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleFinalizar = () => {
    navigate('/feedback');
  };

  const obtenerMensajeSOS = (perfil: number): string => {
    const mensajes: { [key: number]: string } = {
      1: 'Tú tienes el control. Esta respiración te devuelve tu poder.',
      2: 'Estás seguro. Respira y reconecta con tu paz interior.',
      3: 'Todo está bien. Tu creatividad fluye mejor desde la calma.',
      4: 'Estás anclado. Respira y siente tu estabilidad.',
      5: 'Estás presente. Esta respiración te centra aquí y ahora.',
      6: 'Estás protegido. Tu compasión comienza contigo.',
      7: 'Confía en ti. Tu sabiduría interior te guía.',
      8: 'Eres fuerte. Esta respiración restaura tu equilibrio.',
      9: 'Estás acompañado. Respira y siente la conexión universal.'
    };
    
    return mensajes[perfil] || 'Estás seguro. Respira y encuentra tu calma.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 p-4 flex items-center justify-center">
      <BackButton />
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
            🆘 MODO SOS
          </div>
          <h1 className="text-4xl font-bold text-calma-ocean">Respiración Cuadrada</h1>
          <p className="text-lg text-calma-ocean/80">
            Técnica de emergencia para ansiedad intensa
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-8">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-8 border-calma-ocean/20 rounded-lg" />
              <div
                className="absolute inset-0 border-8 border-orange-500 rounded-lg transition-all duration-[4000ms] ease-linear"
                style={{
                  clipPath: `polygon(
                    ${posicionBorde >= 0 && posicionBorde < 25 ? `${posicionBorde * 4}% 0, 0 0` : '100% 0, 0 0'},
                    ${posicionBorde >= 25 && posicionBorde < 50 ? `0 ${(posicionBorde - 25) * 4}%` : posicionBorde >= 50 ? '0 100%' : '0 0'},
                    ${posicionBorde >= 50 && posicionBorde < 75 ? `${(posicionBorde - 50) * 4}% 100%` : posicionBorde >= 75 ? '100% 100%' : '0 100%'},
                    ${posicionBorde >= 75 ? `100% ${100 - (posicionBorde - 75) * 4}%` : '100% 100%'}
                  )`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-calma-ocean animate-pulse-soft">
                  {fases[faseActual]}
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-2xl font-semibold text-calma-ocean">
                {fases[faseActual]} - Cuenta hasta 4
              </p>
              <p className="text-muted-foreground">
                Sigue el recorrido del borde del cuadrado
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-calma-sand/30 rounded-2xl p-6">
            <h3 className="font-semibold text-calma-ocean">Cómo funciona:</h3>
            <ul className="space-y-2 text-sm text-calma-ocean/80">
              <li>• <strong>Lado superior:</strong> Inhala contando 1-2-3-4</li>
              <li>• <strong>Lado derecho:</strong> Mantén el aire 1-2-3-4</li>
              <li>• <strong>Lado inferior:</strong> Exhala contando 1-2-3-4</li>
              <li>• <strong>Lado izquierdo:</strong> Pausa sin aire 1-2-3-4</li>
            </ul>
          </div>

          <div className="bg-orange-100 border-l-4 border-orange-500 rounded-2xl p-6">
            <p className="text-sm italic text-calma-ocean">
              🛡️ {obtenerMensajeSOS(perfilNumerologico)}
            </p>
          </div>

          <Button
            onClick={handleFinalizar}
            size="lg"
            className="w-full h-14 text-lg"
          >
            Me Siento Mejor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RespiracionSOS;
