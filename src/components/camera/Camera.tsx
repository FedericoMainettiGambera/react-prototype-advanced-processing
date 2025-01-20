import { usePermission } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CameraPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-xl">Camera</div>
      <CameraPermission />
      <CameraFeature />
    </div>
  );
}

const CameraPermission = () => {
  const permission = usePermission("camera");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permesso di fotocamera</CardTitle>
        <CardDescription>Gestisci il permesso di utilizzo della fotocamera</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2">
          <div>Stato del permesso:</div>
          {permission.isLoading && <div>Caricamento...</div>}
          {permission.state === "granted" && <pre className="font-medium text-green-500">Garantito</pre>}
          {permission.state === "prompt" && <pre className="font-medium text-yellow-500">Richiesta in corso</pre>}
          {permission.state === "denied" && <pre className="font-medium text-destructive">Rifiutato</pre>}
        </div>
      </CardContent>
    </Card>
  );
};

const CameraFeature = () => {
  const permission = usePermission("camera");

  if (permission.isLoading) {
    return null;
  }

  if (permission.state !== "granted") {
    return (
      <div className="text-muted-foreground">
        Non è possibile usare la funzionalità della fotocamera perchè i permessi non sono stati garantiti.
      </div>
    );
  }

  return <div>TODo</div>;
};
