import { useAppConfigQuery } from "@/api/query/useAppConfigQuery";
import MeasureCard from "@/components/home/MeasureCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/measures")({
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
          <div className="font-semibold text-xl">Misure</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.measures.map(measure => (
              <MeasureCard key={measure.Id} measure={measure} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
