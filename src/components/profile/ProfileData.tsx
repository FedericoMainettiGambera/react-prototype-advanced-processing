import { useAuth } from "@/stores/auth";
import { Pen } from "lucide-react";
import { DateTime } from "luxon";
import { useState, type PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import EditProfileDialog from "./EditProfileDialog";

export default function ProfileData() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0 flex flex-col gap-1">
          <h3 className="font-semibold">Informazioni del profilo</h3>
          <p className="max-w-2xl text-sm text-muted-foreground">Visualizza e modifica i dati del tuo profilo personale.</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
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
          {auth.subjectsLog?.birthdate && DateTime.fromJSDate(new Date(auth.subjectsLog.birthdate)).toLocaleString(DateTime.DATE_FULL)}
        </DataRow>
        <Separator />
        <DataRow title="Genere">{auth.subjectsLog?.gender === "M" ? "Maschio" : "Femmina"}</DataRow>
        <Separator />
      </div>
    </div>
  );
}

const DataRow = ({
  title,
  children,
}: {
  title: string;
} & PropsWithChildren) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm/6 text-muted-foreground sm:col-span-2 sm:mt-0">{children ?? "-"}</div>
    </div>
  );
};
