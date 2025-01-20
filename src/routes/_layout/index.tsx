import { useAppConfigQuery } from "@/api/query/useAppConfigQuery";
import DeviceCard from "@/components/home/DeviceCard";
import MeasureCard from "@/components/home/MeasureCard";
import ServiceCard from "@/components/home/ServiceCard";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: Page,
});

function Page() {
  const appConfigQuery = useAppConfigQuery();

  return (
    <div>
      {appConfigQuery.isLoading && <div>Caricamento</div>}
      {appConfigQuery.isError && <div>Errore: {appConfigQuery.error.message}</div>}
      {appConfigQuery.isSuccess && (
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-xl">Servizi</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.services
              .filter(service => service.Config.Action === "view")
              .map(service => (
                <ServiceCard key={service.Id} service={service} />
              ))}
          </div>
          <Separator />
          <div className="font-semibold">Misure</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.measures.map(measure => (
              <MeasureCard key={measure.Id} measure={measure} />
            ))}
          </div>
          <Separator />
          <div className="font-semibold">Dispositivi</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.devices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return <div>Home page</div>;
}
