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
      <SidebarHeader className="border-b p-4">
        {open && (
          <h2 className="text-xl font-bold bg-gradient-peace bg-clip-text text-transparent">
            Calma
          </h2>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
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
    <SidebarTrigger className="fixed top-4 left-4 z-50">
      <Menu className="h-6 w-6" />
    </SidebarTrigger>
  );
}
