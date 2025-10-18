import { Heart, Brain, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Tu compañero de bienestar emocional
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              CalmaAhora es más que una app de respiración. Es una herramienta de autoconocimiento emocional que te ayuda a navegar el estrés, la ansiedad y las emociones difíciles con técnicas respaldadas científicamente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Gestión emocional</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identifica y regula tus emociones con ejercicios personalizados de respiración guiada
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                <Brain className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Autoconocimiento</h3>
              <p className="text-muted-foreground leading-relaxed">
                Desarrolla consciencia emocional con tu bitácora personal y símbolos de acompañamiento
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Alivio inmediato</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accede a tu botón SOS para calma instantánea cuando más lo necesitas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
