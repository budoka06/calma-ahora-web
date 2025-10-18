import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BitoraEntry {
  id: string;
  fecha: string;
  emocionInicial: string;
  contextoEmocional?: string;
  tecnicaElegida: string;
  emocionFinal: string;
  comentarioFinal?: string;
}

interface AppContextType {
  nombreUsuario: string;
  setNombreUsuario: (nombre: string) => void;
  fechaNacimiento: string;
  setFechaNacimiento: (fecha: string) => void;
  perfilNumerologico: number;
  setPerfilNumerologico: (perfil: number) => void;
  emocionInicial: string;
  setEmocionInicial: (emocion: string) => void;
  contextoEmocional: string;
  setContextoEmocional: (contexto: string) => void;
  tecnicaElegida: string;
  setTecnicaElegida: (tecnica: string) => void;
  emocionFinal: string;
  setEmocionFinal: (emocion: string) => void;
  comentarioFinal: string;
  setComentarioFinal: (comentario: string) => void;
  bitacora: BitoraEntry[];
  agregarEntradaBitacora: (entrada: Omit<BitoraEntry, 'id' | 'fecha'>) => void;
  resetCheckIn: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [perfilNumerologico, setPerfilNumerologico] = useState(0);
  const [emocionInicial, setEmocionInicial] = useState('');
  const [contextoEmocional, setContextoEmocional] = useState('');
  const [tecnicaElegida, setTecnicaElegida] = useState('');
  const [emocionFinal, setEmocionFinal] = useState('');
  const [comentarioFinal, setComentarioFinal] = useState('');
  const [bitacora, setBitacora] = useState<BitoraEntry[]>([]);

  const agregarEntradaBitacora = (entrada: Omit<BitoraEntry, 'id' | 'fecha'>) => {
    const nuevaEntrada: BitoraEntry = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString('es-ES'),
      ...entrada,
    };
    setBitacora(prev => [nuevaEntrada, ...prev]);
  };

  const resetCheckIn = () => {
    setEmocionInicial('');
    setContextoEmocional('');
    setEmocionFinal('');
    setComentarioFinal('');
  };

  return (
    <AppContext.Provider
      value={{
        nombreUsuario,
        setNombreUsuario,
        fechaNacimiento,
        setFechaNacimiento,
        perfilNumerologico,
        setPerfilNumerologico,
        emocionInicial,
        setEmocionInicial,
        contextoEmocional,
        setContextoEmocional,
        tecnicaElegida,
        setTecnicaElegida,
        emocionFinal,
        setEmocionFinal,
        comentarioFinal,
        setComentarioFinal,
        bitacora,
        agregarEntradaBitacora,
        resetCheckIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};
