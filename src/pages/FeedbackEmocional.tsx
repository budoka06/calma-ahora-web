import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';

const emociones = [
  { emoji: '😊', label: 'Feliz', value: 'feliz' },
  { emoji: '😌', label: 'Tranquilo', value: 'tranquilo' },
  { emoji: '😰', label: 'Ansioso', value: 'ansioso' },
  { emoji: '😢', label: 'Triste', value: 'triste' },
  { emoji: '😠', label: 'Enojado', value: 'enojado' },
];

const FeedbackEmocional = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    emocionInicial,
    contextoEmocional,
    tecnicaElegida,
    emocionFinal,
    setEmocionFinal,
    comentarioFinal,
    setComentarioFinal,
    agregarEntradaBitacora,
    resetCheckIn,
  } = useAppContext();

  const [emocionSeleccionada, setEmocionSeleccionada] = useState(emocionFinal);
  const [comentario, setComentario] = useState(comentarioFinal);

  const handleGuardar = () => {
    if (!emocionSeleccionada) {
      alert('Por favor selecciona cómo te sientes ahora');
      return;
    }

    setEmocionFinal(emocionSeleccionada);
    setComentarioFinal(comentario);

    agregarEntradaBitacora({
      emocionInicial,
      contextoEmocional,
      tecnicaElegida,
      emocionFinal: emocionSeleccionada,
      comentarioFinal: comentario,
    });

    toast({
      title: '¡Guardado! 💚',
      description: 'Tu estado ha sido registrado en tu bitácora',
      duration: 3000,
    });

    setTimeout(() => {
      resetCheckIn();
      navigate('/check-in');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-2xl mx-auto pt-8 pb-16 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-calma-ocean">
            ¿Cómo te sientes ahora?
          </h1>
          <p className="text-muted-foreground">
            Acabas de completar {tecnicaElegida}
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-calma-ocean block">
              Selecciona tu estado actual
            </label>
            <div className="grid grid-cols-5 gap-4">
              {emociones.map((emocion) => (
                <button
                  key={emocion.value}
                  onClick={() => setEmocionSeleccionada(emocion.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    emocionSeleccionada === emocion.value
                      ? 'bg-gradient-primary shadow-glow ring-4 ring-calma-ocean/20'
                      : 'bg-calma-sand/30 hover:bg-calma-sand/50'
                  }`}
                >
                  <span className="text-5xl">{emocion.emoji}</span>
                  <span className="text-sm font-medium text-calma-ocean">
                    {emocion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-calma-ocean">
              ¿Cómo te ayudó el ejercicio? (Opcional)
            </label>
            <Textarea
              placeholder="Comparte tu experiencia..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="bg-calma-mint/30 rounded-2xl p-6 space-y-2">
            <h3 className="font-semibold text-calma-ocean">Resumen de tu sesión:</h3>
            <div className="text-sm text-calma-ocean/80 space-y-1">
              <p>• <strong>Emoción inicial:</strong> {emocionInicial}</p>
              {contextoEmocional && (
                <p>• <strong>Contexto:</strong> {contextoEmocional}</p>
              )}
              <p>• <strong>Técnica utilizada:</strong> {tecnicaElegida}</p>
            </div>
          </div>

          <Button
            onClick={handleGuardar}
            size="lg"
            className="w-full h-14 text-lg"
            disabled={!emocionSeleccionada}
          >
            Guardar en mi Bitácora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackEmocional;
