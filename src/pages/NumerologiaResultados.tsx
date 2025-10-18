import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wind, Heart, FileText } from 'lucide-react';
import BackButton from '@/components/BackButton';

interface Archetype {
  id: string;
  title: string;
  strengths: string;
  challenges: string;
  breathing: string;
  affirmation: string;
  extras: any;
}

const NumerologiaResultados = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [archetypes, setArchetypes] = useState<{ [key: string]: Archetype }>({});

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data: reportData, error: reportError } = await supabase
        .from('numerology_reports')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (reportError) throw reportError;

      setReport(reportData);

      // Load archetypes
      const numbers = [
        reportData.life_path,
        reportData.expression_number,
        reportData.soul_urge,
        reportData.personality,
        reportData.personal_year,
      ];

      const { data: archetypeData, error: archetypeError } = await supabase
        .from('numerology_archetypes')
        .select('*')
        .in('id', numbers);

      if (archetypeError) throw archetypeError;

      const archetypeMap = archetypeData.reduce((acc: any, arch: any) => {
        acc[arch.id] = arch;
        return acc;
      }, {});

      setArchetypes(archetypeMap);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startBreathing = (breathing: string) => {
    const breathingMap: { [key: string]: string } = {
      'coherente': '/respiracion/coherente',
      '4-7-8': '/respiracion/478',
      'box': '/respiracion/box',
      '4-4-6': '/respiracion/446',
    };

    navigate(breathingMap[breathing] || '/selector-respiracion');
  };

  const NumberCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
    const archetype = archetypes[number];
    if (!archetype) return null;

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader 
          className="pb-4"
          style={{ backgroundColor: archetype.extras?.color + '20' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
              style={{ backgroundColor: archetype.extras?.color }}
            >
              {number}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{archetype.title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div>
            <h4 className="font-semibold text-sm text-green-700 mb-1">Fortalezas</h4>
            <p className="text-sm">{archetype.strengths}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-orange-700 mb-1">Retos frecuentes</h4>
            <p className="text-sm">{archetype.challenges}</p>
          </div>
          <div className="border-t pt-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">Respiración recomendada</p>
              <p className="text-sm text-blue-700">{archetype.breathing}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-purple-900 mb-1">Afirmación</p>
              <p className="text-sm italic text-purple-700">"{archetype.affirmation}"</p>
            </div>
          </div>
          <Button
            onClick={() => startBreathing(archetype.breathing)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Wind className="mr-2 h-4 w-4" />
            Iniciar respiración
          </Button>
        </CardContent>
      </Card>
    );
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

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender">
        <div className="text-center">
          <p className="text-lg text-gray-600">Informe no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender">
      <BackButton />
      <div className="max-w-4xl mx-auto p-4 pt-20 pb-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2 animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-calma-ocean">Tu Perfil Numerológico</h1>
          <p className="text-muted-foreground">{report.full_name}</p>
        </div>

        <div className="space-y-4 mb-6">
          <NumberCard
            number={report.life_path}
            title="Camino de Vida"
            description="Tu propósito y dirección principal"
          />
          <NumberCard
            number={report.expression_number}
            title="Expresión/Destino"
            description="Tus talentos naturales y potencial"
          />
          <NumberCard
            number={report.soul_urge}
            title="Anhelo del Alma"
            description="Tus motivaciones profundas"
          />
          <NumberCard
            number={report.personality}
            title="Personalidad"
            description="Cómo te perciben los demás"
          />
          <NumberCard
            number={report.personal_year}
            title="Año Personal"
            description="Energía del ciclo anual actual"
          />
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            onClick={() => navigate('/numerologia/historial')}
            variant="outline"
          >
            <FileText className="mr-2 h-4 w-4" />
            Ver historial
          </Button>
          <Button onClick={() => navigate('/bitacora')}>
            <Heart className="mr-2 h-4 w-4" />
            Guardar en bitácora
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground mt-6 border-t pt-4">
          <p>
            Este es un informe simbólico generado el {new Date(report.created_at).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumerologiaResultados;
