import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppBreadcrumb from "./sidebar/AppBreadcrumb";
import { AppSidebar } from "./sidebar/AppSidebar";

export default function AppWrapper({ children }: PropsWithChildren) {
  const location = useLocation();

  if (location.pathname === "/signin") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
