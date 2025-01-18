import AppWrapper from "@/components/layout/AppWrapper";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}
