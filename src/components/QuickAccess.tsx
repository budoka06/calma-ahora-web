import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Heart, Brain, Sparkles } from 'lucide-react';

const QuickAccess = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Respiración guiada',
      description: 'Técnicas personalizadas según tu emoción: 4-7-8, Box Breathing y más',
      action: () => navigate('/selector-respiracion'),
      iconBg: 'bg-teal-900/80',
      iconColor: 'text-teal-400'
    },
    {
      icon: Brain,
      title: 'Chat empático con IA',
      description: 'Conversaciones en español, culturalmente adaptadas y con acciones contextualizadas',
      action: () => navigate('/chat'),
      iconBg: 'bg-purple-900/80',
      iconColor: 'text-purple-400'
    },
    {
      icon: Sparkles,
      title: 'Numerología simbólica',
      description: 'Personalización basada en tu perfil, sin enfoque esotérico sino de autoconocimiento',
      action: () => navigate('/registro'),
      iconBg: 'bg-gray-800/80',
      iconColor: 'text-gray-300'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group cursor-pointer"
                onClick={feature.action}
              >
                <div className="text-center space-y-6">
                  {/* Icon Circle */}
                  <div className="flex justify-center">
                    <div className={`w-24 h-24 rounded-full ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-12 h-12 ${feature.iconColor}`} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-medium text-gray-200 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed px-4">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
