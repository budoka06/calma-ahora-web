import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { Checkbox } from '@/components/ui/checkbox';

const Perfil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState('');
  const [timeZone, setTimeZone] = useState('America/Santiago');
  const [dataConsent, setDataConsent] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="max-w-2xl mx-auto pt-20 pb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-calma-ocean">Mi Perfil</h1>
          </div>

          <div className="space-y-4">
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
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 h-12"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="h-12"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
