import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  // authenthication check should go here, removed because its auth is useless at the moment
  // beforeLoad: ({ context }) => {
  //   if (!context.auth.isSignedIn) {
  //     throw redirect({
  //       to: "/signin",
  //     });
  //   }
  // },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-4 min-h-[90vh]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
