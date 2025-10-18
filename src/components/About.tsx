import { Heart, Brain, Sparkles } from "lucide-react";

const About = () => {
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
            {/* Feature 1 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Respiración guiada</h3>
              <p className="text-muted-foreground leading-relaxed">
                Técnicas personalizadas según tu emoción: 4-7-8, Box Breathing y más
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                <Brain className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Chat empático con IA</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conversaciones en español, culturalmente adaptadas y con acciones contextualizadas
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Numerología simbólica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Personalización basada en tu perfil, sin enfoque esotérico sino de autoconocimiento
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
