import { useAppConfigQuery } from '@/api/query/useAppConfigQuery'
import ServiceCard from '@/components/home/ServiceCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/services')({
  component: Page,
})

function Page() {
  const appConfigQuery = useAppConfigQuery()

  return (
    <div>
      {appConfigQuery.isLoading && <div>Caricamento</div>}
      {appConfigQuery.isError && (
        <div>Errore: {appConfigQuery.error.message}</div>
      )}
      {appConfigQuery.isSuccess && (
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-xl">Servizi</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appConfigQuery.data.services
              .filter((service) => service.Config.Action === 'view')
              .map((service) => (
                <ServiceCard key={service.Id} service={service} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
