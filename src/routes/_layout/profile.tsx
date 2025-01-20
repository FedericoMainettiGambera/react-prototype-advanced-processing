import BioData from "@/components/profile/BioData";
import PrivacyData from "@/components/profile/PrivacyData";
import ProfileData from "@/components/profile/ProfileData";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-12">
      <ProfileData />
      <BioData />
      <PrivacyData />
    </div>
  );
}
