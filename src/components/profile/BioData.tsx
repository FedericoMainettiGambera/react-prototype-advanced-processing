import { useAuth } from "@/stores/auth";
import { Separator } from "../ui/separator";
import { DataRow } from "./DataRow";

export default function BioData() {
  const auth = useAuth();

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0 flex flex-col gap-1">
          <h3 className="font-semibold text-xl">Profilo biometrico</h3>
          <p className="max-w-2xl text-sm text-muted-foreground">Visualizza i dati del tuo profilo biometrico.</p>
        </div>
      </div>
      <div className="mt-6">
        <Separator />
        <DataRow title="Classe">{auth.subjectsLog?.biopayload.Class}</DataRow>
        <Separator />
        <DataRow title="Peso (kg)">{auth.subjectsLog?.biopayload.Weight}</DataRow>
        <Separator />
        <DataRow title="Altezza (cm)">{auth.subjectsLog?.biopayload.Height}</DataRow>
        <Separator />
        <DataRow title="Falcata camminata (cm)">{auth.subjectsLog?.biopayload.StepWalk}</DataRow>
        <Separator />
        <DataRow title="Falcata corsa (cm)">{auth.subjectsLog?.biopayload.StepRun}</DataRow>
        <Separator />
        <DataRow title="Bracciata nuoto (cm)">{auth.subjectsLog?.biopayload.StepSwim}</DataRow>
        <Separator />
      </div>
    </div>
  );
}
