import AgGridUsersRemoteTable from '@/components/users/AgGridUsersRemoteTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users-ag-grid-remote')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AgGridUsersRemoteTable />
}
