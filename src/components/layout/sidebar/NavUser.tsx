"use client";

import { ChevronsUpDown, Info, Laptop, LogOut, Moon, Sun, User } from "lucide-react";

import { useAvatarQuery } from "@/api/query/useAvatarQuery";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useAuth, useSetSubjectsLog } from "@/stores/auth";
import { useNavigate } from "@tanstack/react-router";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();

  const navigate = useNavigate();
  const setSubjectsLog = useSetSubjectsLog();

  const auth = useAuth();
  const avatarQuery = useAvatarQuery();

  const handleLogOut = () => {
    setSubjectsLog(undefined);
    navigate({
      to: "/signin",
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  style={{
                    objectFit: "cover",
                  }}
                  src={avatarQuery.data}
                  alt={auth.subjectsLog?.fullName}
                />
                <AvatarFallback className="rounded-lg">{auth.subjectsLog && getInitials(auth.subjectsLog?.fullName)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold capitalize">{auth.subjectsLog?.fullName.toLowerCase()}</span>
                <span className="truncate text-xs">{auth.subjectsLog?.loginpayload.Email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    style={{
                      objectFit: "cover",
                    }}
                    src={avatarQuery.data}
                    alt={auth.subjectsLog?.fullName}
                  />
                  <AvatarFallback className="rounded-lg">{auth.subjectsLog && getInitials(auth.subjectsLog?.fullName)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold capitalize">{auth.subjectsLog?.fullName.toLowerCase()}</span>
                  <span className="truncate text-xs">{auth.subjectsLog?.loginpayload.Email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={!auth.subjectsLog}
              onClick={() => {
                if (!auth.subjectsLog) {
                  return;
                }
                navigate({
                  to: "/profile",
                });
              }}
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
              Profilo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="h-[1.2rem] w-[1.2rem]" />
              Chiaro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="h-[1.2rem] w-[1.2rem]" />
              Scuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop className="h-[1.2rem] w-[1.2rem]" />
              Sistema
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({
              to: "/info"
            })}>
              <Info className="h-[1.2rem] w-[1.2rem]" />
              Informazioni sull'app
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut />
              Esci
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/); // Split the name by spaces and remove extra whitespace
  if (words.length < 2) {
    throw new Error("The full name must contain at least two words.");
  }
  const initials = words[0][0].toUpperCase() + words[1][0].toUpperCase();
  return initials;
}
