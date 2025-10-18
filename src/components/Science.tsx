import { Award, BookOpen, Heart } from "lucide-react";

const Science = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-secondary rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-accent rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 animate-pulse-soft">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Respaldado por la ciencia
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Las técnicas de CalmaAhora están fundamentadas en investigación científica validada sobre regulación emocional y respiración consciente
            </p>
          </div>

          <div className="bg-card rounded-3xl p-10 md:p-12 shadow-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Respiración 4-7-8</h3>
                  <p className="text-sm">Técnica del Dr. Andrew Weil para calma rápida</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Box Breathing</h3>
                  <p className="text-sm">Usado por Navy SEALs para control de estrés</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Respiración Coherente</h3>
                  <p className="text-sm">5-6 respiraciones por minuto para equilibrio</p>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-2xl">
                <p className="text-base italic mb-2 text-foreground">
                  "La respiración consciente es la herramienta más poderosa y accesible que tenemos para regular nuestro sistema nervioso y gestionar el estrés en tiempo real"
                </p>
                <footer className="text-sm text-muted-foreground">— Investigación en Neurociencia Contemplativa</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;
