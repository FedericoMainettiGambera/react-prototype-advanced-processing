import AgGridUsersLocalTable from '@/components/users/AgGridUsersLocalTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users-ag-grid-local')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AgGridUsersLocalTable />
}
