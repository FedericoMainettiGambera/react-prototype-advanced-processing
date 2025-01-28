import { ChevronRight, MonitorCog, Table2, Users, type LucideIcon } from "lucide-react";

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
import { Link, type LinkProps } from "@tanstack/react-router";
import { useState } from "react";

export type Route = {
  path: LinkProps["to"];
  label: string;
};

export type RouteGroup = {
  label: string;
  icon: LucideIcon;
  routes: Route[];
};

const routeGroups: RouteGroup[] = [
  {
    label: "Grid",
    icon: Table2,
    routes: [{ label: "Tabella configurabile", path: "/" }],
  },
  {
    label: "Funzionalità",
    icon: Users,
    routes: [
      { label: "Geolocalizzazione", path: "/geolocation" },
      { label: "Webcam", path: "/camera" },
    ],
  },
  {
    label: "Configurazione",
    icon: MonitorCog,
    routes: [
      { label: "Servizi", path: "/" },
      { label: "Misure", path: "/measures" },
      { label: "Dispositivi", path: "/devices" },
    ],
  },
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
  const [isOpen, setIsOpen] = useState(false);
  const firstRoute = group.routes[0];

  if (!firstRoute) {
    return null;
  }

  return (
    <Collapsible key={group.label} open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={group.label}>
            <group.icon />
            <span>{group.label}</span>
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
                        <Link to={route.path}>
                          <span>{route.label}</span>
                        </Link>
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
