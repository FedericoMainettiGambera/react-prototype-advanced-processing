import SyncfusionUsersRemoteTable from '@/components/users/SyncfusionUsersRemoteTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users-syncfusion-remote')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SyncfusionUsersRemoteTable />
}
