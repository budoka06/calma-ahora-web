import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { calculateNumerology } from '@/lib/numerology';

const NumerologiaInicio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('display_name, dob')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFullName(data.display_name || '');
        setDob(data.dob || '');
      }
    } catch (error: any) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!fullName.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa tu nombre completo.",
        variant: "destructive",
      });
      return;
    }

    if (!dob) {
      toast({
        title: "Fecha de nacimiento requerida",
        description: "La fecha de nacimiento es necesaria para el cálculo numerológico.",
        variant: "destructive",
      });
      return;
    }

    // Validate age (at least 13 years old)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 13 || (age === 13 && monthDiff < 0)) {
      toast({
        title: "Edad mínima no alcanzada",
        description: "Debes tener al menos 13 años para usar esta función.",
        variant: "destructive",
      });
      return;
    }

    setCalculating(true);

    try {
      const result = calculateNumerology(fullName, new Date(dob));
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Get archetypes for recommendations
      const { data: archetypes } = await supabase
        .from('numerology_archetypes')
        .select('*')
        .in('id', [result.lifePath, result.expression, result.soulUrge, result.personality, result.personalYear]);

      const recommendations = archetypes?.reduce((acc: any, arch: any) => {
        acc[arch.id] = {
          breathing: arch.breathing,
          affirmation: arch.affirmation,
        };
        return acc;
      }, {});

      // Save report
      const { data: report, error } = await supabase
        .from('numerology_reports')
        .insert({
          user_id: session.user.id,
          full_name: fullName,
          dob: dob,
          life_path: result.lifePath,
          expression_number: result.expression,
          soul_urge: result.soulUrge,
          personality: result.personality,
          personal_year: result.personalYear,
          recommendations,
          raw_calc: result.rawCalc,
        })
        .select()
        .single();

      if (error) throw error;

      navigate(`/numerologia/resultados/${report.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-2xl mx-auto pt-20 pb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2 animate-float">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-calma-ocean">Numerología Simbólica</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explora tu energía simbólica para orientar tu práctica de calma. 
              Este contenido es de bienestar y no reemplaza asesoría profesional.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Fecha de nacimiento</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Necesaria para calcular tu perfil numerológico
              </p>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full h-12 text-lg"
            disabled={calculating}
          >
            {calculating ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Calcular perfil simbólico
              </>
            )}
          </Button>

          <div className="text-xs text-center text-muted-foreground border-t pt-4">
            <p>
              La numerología es una herramienta simbólica de autoconocimiento.
              No constituye diagnóstico ni tratamiento profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologiaInicio;
