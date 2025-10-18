import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { Calendar, ArrowRight, Heart } from 'lucide-react';
import BackButton from '@/components/BackButton';

const obtenerEmojiPorValor = (valor: string): string => {
  const emojis: { [key: string]: string } = {
    feliz: '😊',
    tranquilo: '😌',
    ansioso: '😰',
    triste: '😢',
    enojado: '😠',
  };
  return emojis[valor] || '😐';
};

const BitacoraEmocional = () => {
  const navigate = useNavigate();
  const { bitacora, nombreUsuario } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto pt-8 pb-16 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-calma-ocean">
            Tu Bitácora Emocional
          </h1>
          <p className="text-muted-foreground">
            Historial de tu viaje hacia el bienestar, {nombreUsuario}
          </p>
        </div>

        {bitacora.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-12 text-center space-y-4">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-calma-ocean">
              Aún no hay entradas
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Cuando realices tu primer ejercicio de respiración, tus estados emocionales
              se registrarán aquí automáticamente.
            </p>
            <Button
              onClick={() => navigate('/check-in')}
              className="mt-4"
            >
              Comenzar ahora
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bitacora.map((entrada) => (
              <div
                key={entrada.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-6 space-y-4 hover:shadow-glow transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-calma-ocean/60" />
                    <span className="text-sm font-medium text-calma-ocean/80">
                      {entrada.fecha}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-calma-mint/30 text-calma-ocean text-sm font-medium rounded-full">
                    {entrada.tecnicaElegida}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {obtenerEmojiPorValor(entrada.emocionInicial)}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Inicial</p>
                      <p className="font-medium text-calma-ocean capitalize">
                        {entrada.emocionInicial}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-6 h-6 text-calma-ocean/40" />

                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {obtenerEmojiPorValor(entrada.emocionFinal)}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Final</p>
                      <p className="font-medium text-calma-ocean capitalize">
                        {entrada.emocionFinal}
                      </p>
                    </div>
                  </div>
                </div>

                {entrada.contextoEmocional && (
                  <div className="bg-calma-sand/20 rounded-2xl p-4">
                    <p className="text-sm text-calma-ocean/80">
                      <strong>Contexto:</strong> {entrada.contextoEmocional}
                    </p>
                  </div>
                )}

                {entrada.comentarioFinal && (
                  <div className="bg-calma-mint/20 rounded-2xl p-4">
                    <p className="text-sm text-calma-ocean/80">
                      <strong>Reflexión:</strong> {entrada.comentarioFinal}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground italic">
            "Cada respiración es un paso hacia tu bienestar" 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitacoraEmocional;
