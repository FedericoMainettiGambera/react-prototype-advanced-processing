import type { Subjectslog } from "@/api/types";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  subjectsLog: Subjectslog;
  isAuthed: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
