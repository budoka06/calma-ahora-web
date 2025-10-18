import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Wind } from 'lucide-react';
import BackButton from '@/components/BackButton';

const NumerologiaHistorial = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('numerology_reports')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
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
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender">
      <BackButton />
      <div className="max-w-4xl mx-auto p-4 pt-20 pb-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2 animate-float">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-calma-ocean">Historial de Informes</h1>
          <p className="text-muted-foreground">Tus cálculos numerológicos anteriores</p>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">No tienes informes guardados aún</p>
            <Button onClick={() => navigate('/numerologia')}>
              <Plus className="mr-2 h-4 w-4" />
              Crear primer informe
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <p className="text-lg">{report.full_name}</p>
                      <p className="text-sm text-muted-foreground font-normal">
                        {new Date(report.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <p className="text-2xl font-bold text-red-700">{report.life_path}</p>
                      <p className="text-xs text-red-600">Camino</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <p className="text-2xl font-bold text-blue-700">{report.expression_number}</p>
                      <p className="text-xs text-blue-600">Expresión</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <p className="text-2xl font-bold text-purple-700">{report.soul_urge}</p>
                      <p className="text-xs text-purple-600">Alma</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">{report.personality}</p>
                      <p className="text-xs text-green-600">Personalidad</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <p className="text-2xl font-bold text-orange-700">{report.personal_year}</p>
                      <p className="text-xs text-orange-600">Año Personal</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/numerologia/resultados/${report.id}`)}
                      className="flex-1"
                    >
                      Ver detalles completos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumerologiaHistorial;
