import { useAuth } from "@/stores/auth";
import { Pen } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DataRow } from "./DataRow";
import EditProfileDialog from "./EditProfileDialog";

export default function ProfileData() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-start sm:items-center justify-between sm:flex-row gap-4 sm:gap-0">
        <div className="px-4 sm:px-0 flex flex-col gap-1">
          <h3 className="font-semibold text-xl">Informazioni del profilo</h3>
          <p className="max-w-2xl text-sm text-muted-foreground">Visualizza e modifica i dati del tuo profilo personale.</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="mx-4">
          <Pen /> Modifica
        </Button>
        <EditProfileDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="mt-6">
        <Separator />
        <DataRow title="Email">{auth.subjectsLog?.loginpayload.Email}</DataRow>
        <Separator />
        <DataRow title="Nome">{<span className="capitalize">{auth.subjectsLog?.fullName.toLowerCase()}</span>}</DataRow>
        <Separator />
        <DataRow title="Codice fiscale">{auth.subjectsLog?.id}</DataRow>
        <Separator />
        <DataRow title="Data di nascita">
          {auth.subjectsLog?.birthdate && DateTime.fromJSDate(new Date(auth.subjectsLog.birthdate)).toLocaleString(DateTime.DATE_FULL)} ({auth.subjectsLog?.age} anni)
        </DataRow>
        <Separator />
        <DataRow title="Genere">{auth.subjectsLog?.gender === "M" ? "Maschio" : "Femmina"}</DataRow>
        <Separator />
        <DataRow title="Indirizzo di residenza">{auth.subjectsLog?.residencepayload[0].Address}, {auth.subjectsLog?.residencepayload[0].LocalitaCap}</DataRow>
        <Separator />
      </div>
    </div>
  );
}