import { UserPlus, Smile, Wind, BookHeart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      emoji: "👋",
      title: "Crea tu perfil",
      description: "Regístrate con tu nombre y fecha de nacimiento para personalizar tu experiencia emocional",
      color: "primary"
    },
    {
      icon: Smile,
      emoji: "😊",
      title: "Selecciona tu emoción",
      description: "Elige cómo te sientes mediante emojis intuitivos y expresivos",
      color: "secondary"
    },
    {
      icon: Wind,
      emoji: "🌬️",
      title: "Respira con CalmaAhora",
      description: "Sigue la respiración guiada personalizada según tu estado emocional",
      color: "accent"
    },
    {
      icon: BookHeart,
      emoji: "📖",
      title: "Reflexiona y crece",
      description: "Registra tu experiencia en la bitácora y accede al botón SOS cuando lo necesites",
      color: "primary"
    }
  ];

  const colorClasses = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    accent: "bg-accent/20 text-accent"
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-float">💫</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌸</div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cuatro pasos simples para encontrar tu calma interior
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="relative bg-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-lg shadow-card">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${colorClasses[step.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Emoji */}
                  <div className="text-4xl text-center mb-4">{step.emoji}</div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
