import { Heart, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Respiración guiada',
      description: 'Técnicas personalizadas según tu emoción: 4-7-8, Box Breathing y más',
      action: () => navigate('/selector-respiracion'),
      colorClass: 'text-primary',
      bgClass: 'bg-primary/20'
    },
    {
      icon: Brain,
      title: 'Chat empático con IA',
      description: 'Conversaciones en español, culturalmente adaptadas y con acciones contextualizadas',
      action: () => navigate('/chat'),
      colorClass: 'text-secondary',
      bgClass: 'bg-secondary/20'
    },
    {
      icon: Sparkles,
      title: 'Numerología simbólica',
      description: 'Personalización basada en tu perfil, sin enfoque esotérico sino de autoconocimiento',
      action: () => navigate('/registro'),
      colorClass: 'text-accent',
      bgClass: 'bg-accent/20'
    }
  ];

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Tecnología emocional con alma humana
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              CalmaAhora te acompaña con empatía y respaldo científico. Combina respiración guiada, chat conversacional con IA, numerología simbólica y una bitácora emocional personalizada para ayudarte a regular la ansiedad, el estrés y las emociones intensas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center group"
                >
                  <div className={`w-16 h-16 ${feature.bgClass} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft group-hover:scale-110 transition-transform`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <Icon className={`w-8 h-8 ${feature.colorClass}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <Button 
                    onClick={feature.action}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    Probar
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
