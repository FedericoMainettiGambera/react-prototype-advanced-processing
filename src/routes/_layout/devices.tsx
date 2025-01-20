import { useAppConfigQuery } from "@/api/query/useAppConfigQuery";
import DeviceCard from "@/components/home/DeviceCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/devices")({
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
          <div className="font-semibold text-xl">Dispositivi</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.devices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
