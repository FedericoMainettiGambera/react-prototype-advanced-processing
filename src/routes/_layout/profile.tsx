import ProfileData from "@/components/profile/ProfileData";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ProfileData />
      <div>Autorizzazioni privacy</div>
      <div>Misure programmate</div>

      <div>Soglie misure</div>
      <div>Basale - Valori limite del metabolismo a riposo</div>
      <div>Camminata - Valori limite durante la camminata</div>
      <div>Corsa - Valori limite durante la corsa</div>
      <div>Bicicletta - Valori limite durante l&apos;uso di bicicletta</div>
      <div>Nuoto - Valori limite durante il nuoto</div>
      <div>Palestra - Valori limite durante l'attività in palestra</div>

      <div>Profilo biometrico</div>
    </div>
  );
}
