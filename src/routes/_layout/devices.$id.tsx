import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/devices/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>/devices/$id, id: {id}</div>;
}
