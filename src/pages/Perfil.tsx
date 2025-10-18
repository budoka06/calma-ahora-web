import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, TrendingUp, Heart, Sparkles, Calendar } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Perfil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState('');
  const [timeZone, setTimeZone] = useState('America/Santiago');
  const [dataConsent, setDataConsent] = useState(false);
  const [lastNumerologyReport, setLastNumerologyReport] = useState<any>(null);
  const { bitacora } = useAppContext();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setDisplayName(data.display_name || '');
        setDob(data.dob || '');
        setTimeZone(data.time_zone || 'America/Santiago');
        setDataConsent(data.data_consent || false);
      }

      // Cargar último reporte de numerología
      const { data: numerologyData } = await supabase
        .from('numerology_reports')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (numerologyData) {
        setLastNumerologyReport(numerologyData);
      }
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('users')
        .update({
          display_name: displayName,
          dob: dob || null,
          time_zone: timeZone,
          data_consent: dataConsent,
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

  // Preparar datos para gráficos
  const emotionData = bitacora.reduce((acc: any, entry) => {
    const emotion = entry.emocionInicial;
    const existing = acc.find((item: any) => item.emotion === emotion);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ emotion, count: 1 });
    }
    return acc;
  }, []);

  const emotionColors: { [key: string]: string } = {
    feliz: '#10b981',
    tranquilo: '#06b6d4',
    ansioso: '#f59e0b',
    triste: '#3b82f6',
    enojado: '#ef4444',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-6xl mx-auto pt-20 pb-8 space-y-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-calma-ocean">Mi Perfil</h1>
                <p className="text-muted-foreground">{displayName || 'Usuario'}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesiones totales</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bitacora.length}</div>
              <p className="text-xs text-muted-foreground">
                prácticas de bienestar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Numerología</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lastNumerologyReport ? lastNumerologyReport.life_path : '-'}
              </div>
              <p className="text-xs text-muted-foreground">
                {lastNumerologyReport ? 'Camino de vida' : 'No calculado'}
              </p>
              {lastNumerologyReport && (
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 mt-2"
                  onClick={() => navigate('/numerologia/historial')}
                >
                  Ver perfil completo
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última actividad</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bitacora.length > 0 ? 'Hoy' : '-'}
              </div>
              <p className="text-xs text-muted-foreground">
                {bitacora.length > 0 ? bitacora[0].fecha.split(',')[0] : 'Sin actividad'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {bitacora.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estados emocionales</CardTitle>
                <CardDescription>Distribución de tus emociones registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ emotion, percent }) => `${emotion} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {emotionData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={emotionColors[entry.emotion] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progreso semanal</CardTitle>
                <CardDescription>Número de prácticas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[{ name: 'Esta semana', sesiones: bitacora.length }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sesiones" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Información personal</CardTitle>
            <CardDescription>Actualiza tus datos de perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Nombre completo</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Tu nombre"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="timeZone">Zona horaria</Label>
              <Input
                id="timeZone"
                type="text"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={dataConsent}
                onCheckedChange={(checked) => setDataConsent(checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm cursor-pointer">
                Acepto el uso de mis datos para personalizar mi experiencia
              </Label>
            </div>

            <Button
              onClick={handleSave}
              className="w-full h-12"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;
