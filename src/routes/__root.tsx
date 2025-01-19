import type { AuthContext } from "@/stores/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  component: () => <Outlet />,
});
