import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-md"
      aria-label="Volver atrás"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
