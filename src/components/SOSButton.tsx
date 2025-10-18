import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SOSButton = () => {
  const { toast } = useToast();
  const emergencyNumber = '6003607777';

  const handleSOSClick = () => {
    // Mostrar mensaje al usuario
    toast({
      title: "Llamando a Emergencias",
      description: "Recuerda presionar la opción 1 cuando se te solicite",
      duration: 5000,
    });
    
    // Iniciar la llamada
    window.location.href = `tel:${emergencyNumber}`;
  };

  return (
    <Button
      onClick={handleSOSClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl animate-pulse"
      aria-label="Botón de emergencia SOS"
    >
      <Phone className="h-8 w-8" />
    </Button>
  );
};

export default SOSButton;
