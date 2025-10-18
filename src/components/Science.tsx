import { Award, BookOpen, Heart } from "lucide-react";

const Science = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ciencia, ética y transparencia
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Las técnicas que usamos están respaldadas por estudios sobre respiración, mindfulness y psicología cognitiva
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-10 md:p-12 shadow-card mb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Respiración 4-7-8</h3>
                <p className="text-sm text-muted-foreground">Técnica del Dr. Andrew Weil para calma rápida</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Box Breathing</h3>
                <p className="text-sm text-muted-foreground">Usado por Navy SEALs para control de estrés</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Respiración Coherente</h3>
                <p className="text-sm text-muted-foreground">5-6 respiraciones por minuto para equilibrio</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-2xl">
              <p className="text-base italic mb-2 text-foreground">
                "La respiración consciente tiene el poder de modificar nuestro estado emocional y físico en tiempo real, activando respuestas de calma en el sistema nervioso."
              </p>
              <footer className="text-sm text-muted-foreground">— Investigación en Neurociencia Contemplativa</footer>
            </blockquote>
          </div>

          {/* Privacy and Ethics */}
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl shadow-soft">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Tu privacidad es sagrada</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tus datos emocionales están protegidos con encriptación de extremo a extremo y nunca se comparten con terceros. CalmaAhora cumple con las regulaciones internacionales de privacidad y trabaja bajo principios éticos de acompañamiento digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;
