import { useGeoLocation } from "@/hooks/useGeolocation";
import { usePermission } from "@/hooks/usePermissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function GeolocationPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[600px]">
      <div className="font-semibold text-xl">Geolocalizzazione</div>
      <GeolocationPermission />
      <GeolocationFeature />
    </div>
  );
}

const GeolocationPermission = () => {
  const permission = usePermission("geolocation");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permesso di geolocalizzazione</CardTitle>
        <CardDescription>Gestisci il permesso di geolocalizzazione</CardDescription>
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

const GeolocationFeature = () => {
  const permission = usePermission("geolocation");

  const geolocation = useGeoLocation();

  if (permission.isLoading) {
    return null;
  }

  if (permission.state !== "granted") {
    return (
      <div className="text-muted-foreground">
        Non è possibile usare gli strumenti di geolocalizzazione perchè i permessi non sono stati garantiti.
      </div>
    );
  }

  if (geolocation.error) {
    return <div className="text-muted-foreground">Errore: {geolocation.error.message}</div>;
  }

  if (geolocation.loading) {
    return <div>Caricamento...</div>;
  }

  return <pre>{JSON.stringify(geolocation.coordinates, null, 2)}</pre>;
};
