import { MessageSquare, Zap, Sparkles, Lock } from "lucide-react";

const diferenciadores = [
  {
    icon: MessageSquare,
    title: "Chat empático en español",
    description: "Conversaciones culturalmente adaptadas, con lenguaje cercano y acciones contextualizadas según tu estado emocional",
  },
  {
    icon: Zap,
    title: "Acciones inmediatas",
    description: "No solo escuchamos: te guiamos a respirar, reflexionar y actuar en el momento que más lo necesitas",
  },
  {
    icon: Sparkles,
    title: "Personalización simbólica",
    description: "Numerología pitagórica para mensajes y técnicas adaptadas a tu perfil, sin enfoque esotérico sino de autoconocimiento",
  },
  {
    icon: Lock,
    title: "Privacidad y ética",
    description: "Tus datos emocionales están protegidos y nunca se comparten. Respaldo científico sin compromiso de tu confidencialidad",
  },
];

const Diferenciadores = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ¿Por qué CalmaAhora es diferente?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No somos una app más de meditación. Somos tu compañero emocional inteligente y empático
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {diferenciadores.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 border border-primary/10"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Diferenciadores;
