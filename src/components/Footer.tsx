import { Button } from "@/components/ui/button";
import { Download, Heart, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comienza tu viaje hacia la calma
          </h2>
          <p className="text-xl mb-8 text-background/80 max-w-2xl mx-auto">
            Descarga CalmaAhora y encuentra paz en cada respiración
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full shadow-glow transition-all duration-300 hover:scale-105"
          >
            <Download className="mr-2 h-5 w-5" />
            Descargar ahora
          </Button>
        </div>

        <div className="border-t border-background/20 pt-12">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                CalmaAhora
                <span className="text-3xl">🧘</span>
              </h3>
              <p className="text-background/70 leading-relaxed">
                Tu compañero de bienestar emocional. Respiración consciente y autoconocimiento al alcance de tu mano.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#about" className="hover:text-background transition-colors">Sobre CalmaAhora</a></li>
                <li><a href="#how" className="hover:text-background transition-colors">Cómo funciona</a></li>
                <li><a href="#benefits" className="hover:text-background transition-colors">Beneficios</a></li>
                <li><a href="#science" className="hover:text-background transition-colors">Evidencia científica</a></li>
              </ul>
            </div>

            {/* Social */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
              <div className="flex gap-4 justify-center md:justify-end mb-4">
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="text-background/70 text-sm">
                Únete a nuestra comunidad de bienestar
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/60 mb-4 flex items-center justify-center gap-2">
              Hecho con <Heart className="w-4 h-4 fill-current animate-pulse-soft" /> para tu bienestar emocional
            </p>
            <p className="text-background/50 text-sm">
              © 2025 CalmaAhora. Todos los derechos reservados. | Política de privacidad | Términos de servicio
            </p>
            <p className="text-background/50 text-xs mt-2 italic">
              Respira. Conecta. CalmaAhora.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
