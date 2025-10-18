import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Play, User, LogIn } from "lucide-react";
import heroImage from "@/assets/hero-calma.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Auth buttons */}
      <div className="absolute top-6 right-6 z-20">
        {user ? (
          <Button
            onClick={() => navigate('/perfil')}
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          >
            <User className="mr-2 h-4 w-4" />
            Mi Perfil
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/auth')}
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar Sesión
          </Button>
        )}
      </div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Breathing animation circle - central element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-breathe shadow-glow"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground leading-tight">
            Tu calma empieza ahora
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Una app que te acompaña a regular tus emociones con respiración, autoconocimiento y empatía
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/registro">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Iniciar
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-primary bg-card/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              Conoce más
            </Button>
          </div>

          {/* Emoji indicators */}
          <div className="mt-16 flex justify-center gap-6 text-4xl">
            <span className="animate-float">😌</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>🧘</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>💙</span>
            <span className="animate-float" style={{ animationDelay: '1.5s' }}>✨</span>
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" 
                fill="hsl(var(--card))" fillOpacity="0.8"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
