import { UserPlus, Smile, Wind, AlertCircle, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    emoji: "📝",
    title: "Registro personalizado",
    description: "Ingresa tu nombre y fecha de nacimiento para crear tu perfil emocional único",
    color: "ocean",
  },
  {
    icon: Smile,
    emoji: "😊",
    title: "Selecciona tu emoción",
    description: "Elige el emoji que mejor describe cómo te sientes en este momento",
    color: "lavender",
  },
  {
    icon: Wind,
    emoji: "🌬️",
    title: "Calma Ahora",
    description: "Accede a técnicas de respiración guiada personalizadas según tu estado emocional",
    color: "mint",
  },
  {
    icon: AlertCircle,
    emoji: "🆘",
    title: "Botón SOS",
    description: "Para momentos de ansiedad intensa, activa la respiración cuadrada 4-4-4-4 al instante",
    color: "coral",
  },
  {
    icon: MessageCircle,
    emoji: "💬",
    title: "Chat IA y bitácora",
    description: "Conversa con empatía, reflexiona y registra tu viaje emocional en tu bitácora personal",
    color: "ocean",
  },
];

const colorClasses: Record<string, string> = {
  ocean: "bg-calma-ocean/20 text-calma-ocean border-calma-ocean/30",
  lavender: "bg-calma-lavender/20 text-calma-lavender border-calma-lavender/30",
  mint: "bg-calma-mint/20 text-calma-mint border-calma-mint/30",
  coral: "bg-[hsl(12_100%_83%)]/20 text-[hsl(12_100%_70%)] border-[hsl(12_100%_83%)]/30",
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-calma-lavender/30 via-calma-turquoise/20 to-calma-mint/25 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-calma-sunshine/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-calma-coral/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Cómo funciona CalmaAhora
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Cinco pasos simples para transformar tu relación con tus emociones
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-card hover:shadow-vibrant transition-all duration-300 hover:-translate-y-2 relative border-2 border-accent/20"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-joy rounded-full flex items-center justify-center text-white font-bold text-xl shadow-glow">
                  {index + 1}
                </div>
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 ${colorClasses[step.color]}`}>
                  <Icon className="w-8 h-8" />
                </div>

                <div className="text-5xl text-center mb-4">{step.emoji}</div>

                <h3 className="text-xl font-semibold mb-4 text-foreground text-center">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
