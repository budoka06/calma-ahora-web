import { Home, Heart, Wind, Flower2, BookHeart, MessageCircle, Star, User, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Check-In Emocional", url: "/check-in", icon: Heart },
  { title: "Respiración", url: "/selector-respiracion", icon: Wind },
  { title: "Meditación", url: "/meditacion", icon: Flower2 },
  { title: "Bitácora", url: "/bitacora", icon: BookHeart },
  { title: "Chat Empático", url: "/chat", icon: MessageCircle },
  { title: "Numerología", url: "/numerologia", icon: Star },
  { title: "Perfil", url: "/perfil", icon: User },
];

export function NavigationDrawer() {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada");
      navigate("/auth");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <Sidebar className={open ? "w-64" : "w-14"} collapsible="icon">
      <SidebarHeader className="border-b p-4 bg-background">
        {open && (
          <h2 className="text-xl font-bold bg-gradient-peace bg-clip-text text-transparent">
            Calma
          </h2>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-background">
        <SidebarGroup>
          {open && <SidebarGroupLabel className="text-muted-foreground px-3 py-2">Navegación</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className={`
                          w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                          ${isActive 
                            ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90" 
                            : "hover:bg-muted text-foreground"
                          }
                        `}
                      >
                        <item.icon className={`h-5 w-5 ${!open && "mx-auto"}`} />
                        {open && <span className="truncate">{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2 bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            >
              <LogOut className={`h-5 w-5 ${!open && "mx-auto"}`} />
              {open && <span>Cerrar Sesión</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function NavigationDrawerTrigger() {
  return (
    <SidebarTrigger className="fixed top-4 left-4 z-50 bg-background border rounded-lg p-2 shadow-lg hover:bg-muted transition-colors duration-200">
      <Menu className="h-5 w-5" />
    </SidebarTrigger>
  );
}
