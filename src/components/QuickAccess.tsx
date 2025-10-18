import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wind, MessageCircle, Star } from 'lucide-react';

const QuickAccess = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wind,
      title: 'Respiración Guiada',
      description: 'Técnicas personalizadas para regular tus emociones',
      action: () => navigate('/check-in'),
      gradient: 'from-calma-mint to-calma-ocean'
    },
    {
      icon: MessageCircle,
      title: 'Chat Empático con IA',
      description: 'Comparte cómo te sientes en un espacio seguro',
      action: () => navigate('/chat'),
      gradient: 'from-calma-lavender to-calma-ocean'
    },
    {
      icon: Star,
      title: 'Numerología Simbólica',
      description: 'Descubre tu perfil emocional personalizado',
      action: () => navigate('/registro'),
      gradient: 'from-calma-coral to-calma-ocean'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-calma-sand/30 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-calma-ocean mb-4">
            Acceso Rápido
          </h2>
          <p className="text-lg text-calma-ocean/70">
            Comienza tu viaje hacia el bienestar emocional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-calma-ocean/10 hover:border-calma-ocean/30 transition-all duration-300 hover:shadow-glow cursor-pointer"
                onClick={feature.action}
              >
                <div className="p-8 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-calma-ocean">
                    {feature.title}
                  </h3>
                  
                  <p className="text-calma-ocean/70">
                    {feature.description}
                  </p>

                  <Button 
                    className="w-full mt-4 bg-gradient-primary hover:opacity-90"
                    size="lg"
                  >
                    Comenzar
                  </Button>
                </div>

                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
