import { Quote } from "lucide-react";

const testimonios = [
  {
    texto: "Gracias a CalmaAhora aprendí a detenerme, respirar y seguir con más claridad. Ya no me siento tan abrumada por mis emociones.",
    nombre: "María José",
    rol: "Profesora",
  },
  {
    texto: "En momentos difíciles, la app me recordó que podía calmar mi mente. El botón SOS me ha salvado en varias ocasiones.",
    nombre: "Carlos",
    rol: "Estudiante universitario",
  },
  {
    texto: "Lo que más me gusta es que no me juzga. El chat empático realmente entiende lo que siento y me guía con cariño.",
    nombre: "Ana",
    rol: "Diseñadora",
  },
];

const Testimonios = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Historias de calma y transformación
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Personas reales compartiendo cómo CalmaAhora las ha acompañado
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonio.texto}"
              </p>
              
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{testimonio.nombre}</p>
                <p className="text-sm text-muted-foreground">{testimonio.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
