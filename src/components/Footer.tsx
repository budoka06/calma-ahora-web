import { Button } from "@/components/ui/button";
import { Download, Heart, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-card rounded-3xl p-12 shadow-card mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Tómate un respiro. Todo está bien.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descarga CalmaAhora y comienza tu viaje hacia una vida más tranquila, consciente y equilibrada
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105"
          >
            <Download className="mr-2 h-5 w-5" />
            Descargar CalmaAhora
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
            <p className="text-lg font-medium text-background/80 mb-3">Respira. Conecta. CalmaAhora.</p>
            <p className="text-background/50 text-sm">
              © 2025 CalmaAhora. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-colors">Política de Privacidad</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">Términos de Servicio</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
