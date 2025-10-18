import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/contexts/AppContext';
import { Heart } from 'lucide-react';
import BackButton from '@/components/BackButton';

const calcularPerfilNumerologico = (fecha: string): number => {
  const digitos = fecha.replace(/\D/g, '');
  let suma = digitos.split('').reduce((acc, d) => acc + parseInt(d), 0);
  
  while (suma > 9) {
    suma = suma.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return suma;
};

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const { setNombreUsuario, setFechaNacimiento, setPerfilNumerologico } = useAppContext();
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');

  const handleComenzar = () => {
    if (!nombre.trim() || !fecha) {
      alert('Por favor completa ambos campos');
      return;
    }

    setNombreUsuario(nombre);
    setFechaNacimiento(fecha);
    const perfil = calcularPerfilNumerologico(fecha);
    setPerfilNumerologico(perfil);
    navigate('/check-in');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-calma-sky via-calma-mint to-calma-lavender p-4">
      <BackButton />
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-elegant p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2 animate-float">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-calma-ocean">Bienvenido a CalmaAhora</h1>
          <p className="text-muted-foreground">Comencemos tu viaje hacia la calma emocional</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha de Nacimiento</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <Button
          onClick={handleComenzar}
          size="lg"
          className="w-full h-12 text-lg"
        >
          Comenzar
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Tu información nos ayudará a personalizar tu experiencia
        </p>
      </div>
    </div>
  );
};

export default RegistroUsuario;
