import { ChevronRight, Users, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export type Route = {
  path: string;
  label: string;
};

export type RouteGroup = {
  label: string;
  icon: LucideIcon;
  routes: Route[];
};

const routeGroups: RouteGroup[] = [
  {
    label: "Funzionalità",
    icon: Users,
    routes: [
      { label: "Users", path: "/users" },
      { label: "Devices", path: "/devices" },
    ],
  },
  // {
  //   label: "Servizi",
  //   icon: SquareTerminal,
  //   routes: [
  //     { label: "Misure", path: "/services/measures" },
  //     { label: "Dettagli Misure", path: "/services/measures-details/:id" },
  //     { label: "Monitor Misure", path: "/services/measures-monitor" },
  //     { label: "Luoghi", path: "/services/places" },
  //     { label: "Test Dispositivi", path: "/services/devices-test" },
  //     { label: "Accesso", path: "/services/access" },
  //   ],
  // },
] as const;

export function Navigation() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {routeGroups.map(group => (
          <RouteGroup group={group} key={group.label} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function RouteGroup({ group }: { group: RouteGroup }) {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = group.routes.some(route => route.path === currentPath);
    setIsActive(active);
  }, [location.pathname, group.routes]);

  const firstRoute = group.routes[0];

  if (!firstRoute) {
    return null;
  }

  return (
    <Collapsible key={group.label} open={isOpen || isActive} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={group.label}>
            <div>
              <group.icon />
              <span>{group.label}</span>
            </div>
          </SidebarMenuButton>
          {Boolean(group.routes.length) && (
            <>
              <SidebarMenuAction className={cn(isOpen && "rotate-90")} onClick={() => setIsOpen(prev => !prev)}>
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {group.routes?.map(route => (
                    <SidebarMenuSubItem key={route.label}>
                      <SidebarMenuSubButton asChild>
                        <a href={route.path}>
                          <span>{route.label}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </>
          )}
        </SidebarMenuItem>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
