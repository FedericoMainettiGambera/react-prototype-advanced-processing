import Users from "@/components/users/Users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Users />
    </>
  );
}
