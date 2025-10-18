import { Zap, TrendingUp, Shield, Heart } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Reducción inmediata de ansiedad",
    description: "Técnicas probadas que activan tu sistema nervioso parasimpático en minutos para calmar tu cuerpo y mente",
  },
  {
    icon: TrendingUp,
    title: "Mejora tu regulación emocional",
    description: "Desarrolla la capacidad de identificar, comprender y gestionar tus emociones de forma saludable y sostenible",
  },
  {
    icon: Heart,
    title: "Acompañamiento accesible y confidencial",
    description: "Disponible 24/7, en español, con empatía cultural y respeto absoluto por tu privacidad emocional",
  },
  {
    icon: Shield,
    title: "Prevención del estrés crónico",
    description: "Construye hábitos saludables que fortalecen tu resiliencia emocional y previenen el agotamiento",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-calma-coral/25 via-calma-peach/20 to-calma-rose/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Beneficios reales para tu bienestar
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            CalmaAhora transforma tu relación con las emociones y mejora tu calidad de vida
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-elegant hover:shadow-vibrant transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-2 border-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-peace rounded-full flex items-center justify-center mb-6 shadow-soft">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
