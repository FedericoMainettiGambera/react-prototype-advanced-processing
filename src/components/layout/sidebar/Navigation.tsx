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
import { useState } from "react";

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
