import Geolocation from "@/components/geolocation/Geolocation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/geolocation")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Geolocation />
    </div>
  );
}
