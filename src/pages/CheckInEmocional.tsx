import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/contexts/AppContext';
import { BookHeart, AlertCircle } from 'lucide-react';

const emociones = [
  { emoji: '😊', label: 'Feliz', value: 'feliz' },
  { emoji: '😌', label: 'Tranquilo', value: 'tranquilo' },
  { emoji: '😰', label: 'Ansioso', value: 'ansioso' },
  { emoji: '😢', label: 'Triste', value: 'triste' },
  { emoji: '😠', label: 'Enojado', value: 'enojado' },
];

const CheckInEmocional = () => {
  const navigate = useNavigate();
  const { 
    nombreUsuario, 
    emocionInicial, 
    setEmocionInicial, 
    contextoEmocional, 
    setContextoEmocional,
    setTecnicaElegida,
    resetCheckIn
  } = useAppContext();
  
  const [contexto, setContexto] = useState(contextoEmocional);

  const handleSeleccionEmocion = (value: string) => {
    setEmocionInicial(value);
  };

  const handleCalmaAhora = () => {
    if (!emocionInicial) {
      alert('Por favor selecciona cómo te sientes');
      return;
    }
    
    setContextoEmocional(contexto);
    
    let tecnica = '';
    if (emocionInicial === 'ansioso') {
      tecnica = 'Respiración 4-7-8';
    } else if (emocionInicial === 'enojado' || emocionInicial === 'triste') {
      tecnica = 'Respiración 4-4';
    } else {
      tecnica = 'Respiración Suave';
    }
    
    setTecnicaElegida(tecnica);
    navigate('/respiracion-guiada');
  };

  const handleSOS = () => {
    setContextoEmocional(contexto);
    setTecnicaElegida('Respiración Cuadrada (SOS)');
    navigate('/respiracion-sos');
  };

  const handleVerBitacora = () => {
    navigate('/bitacora');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <div className="max-w-2xl mx-auto pt-8 pb-16 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-calma-ocean">
            ¡Hola, {nombreUsuario || 'Usuario'}! 👋
          </h1>
          <h2 className="text-2xl font-semibold text-calma-ocean/80">
            ¿Cómo te sientes hoy?
          </h2>
          <p className="text-muted-foreground">
            Selecciona el emoji que mejor describa tu estado de ánimo
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6">
          <div className="grid grid-cols-5 gap-4">
            {emociones.map((emocion) => (
              <button
                key={emocion.value}
                onClick={() => handleSeleccionEmocion(emocion.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  emocionInicial === emocion.value
                    ? 'bg-gradient-primary shadow-glow ring-4 ring-calma-ocean/20'
                    : 'bg-calma-sand/30 hover:bg-calma-sand/50'
                }`}
              >
                <span className="text-5xl">{emocion.emoji}</span>
                <span className="text-sm font-medium text-calma-ocean">{emocion.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-calma-ocean">
              ¿Qué sucede? (Opcional)
            </label>
            <Textarea
              placeholder="Cuéntanos más sobre cómo te sientes..."
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleCalmaAhora}
              size="lg"
              className="h-14 text-lg"
              disabled={!emocionInicial}
            >
              Calma Ahora
            </Button>
            <Button
              onClick={handleSOS}
              size="lg"
              variant="destructive"
              className="h-14 text-lg bg-orange-500 hover:bg-orange-600"
            >
              <AlertCircle className="mr-2" />
              SOS
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleVerBitacora}
            variant="ghost"
            className="gap-2"
          >
            <BookHeart className="w-5 h-5" />
            Ver Bitácora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInEmocional;
