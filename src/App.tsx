import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import SOSButton from "./components/SOSButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegistroUsuario from "./pages/RegistroUsuario";
import CheckInEmocional from "./pages/CheckInEmocional";
import SelectorRespiracion from "./pages/SelectorRespiracion";
import RespiracionGuiada from "./pages/RespiracionGuiada";
import RespiracionSOS from "./pages/RespiracionSOS";
import FeedbackEmocional from "./pages/FeedbackEmocional";
import BitacoraEmocional from "./pages/BitacoraEmocional";
import ChatEmpatico from "./pages/ChatEmpatico";
import MeditacionGuiada from "./pages/MeditacionGuiada";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SOSButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/check-in" element={<CheckInEmocional />} />
            <Route path="/selector-respiracion" element={<SelectorRespiracion />} />
            <Route path="/respiracion-guiada" element={<RespiracionGuiada />} />
            <Route path="/respiracion-sos" element={<RespiracionSOS />} />
            <Route path="/meditacion" element={<MeditacionGuiada />} />
            <Route path="/feedback" element={<FeedbackEmocional />} />
            <Route path="/bitacora" element={<BitacoraEmocional />} />
            <Route path="/chat" element={<ChatEmpatico />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
