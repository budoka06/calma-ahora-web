import { Zap, TrendingUp, MessageCircle, Shield } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Alivio inmediato",
      description: "Reduce la ansiedad y el estrés en minutos con técnicas de respiración científicamente validadas"
    },
    {
      icon: TrendingUp,
      title: "Crecimiento emocional",
      description: "Desarrolla autoconciencia y comprende tus patrones emocionales a través del tiempo"
    },
    {
      icon: MessageCircle,
      title: "Lenguaje empático",
      description: "Comunicación cálida y humana que te acompaña sin juzgar en tus momentos difíciles"
    },
    {
      icon: Shield,
      title: "Enfoque preventivo",
      description: "No es terapia clínica, es una herramienta de bienestar accesible para tu día a día"
    }
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Beneficios que transforman tu bienestar
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              CalmaAhora te ofrece herramientas probadas para mejorar tu salud emocional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gradient-card rounded-3xl p-10 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3 text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
