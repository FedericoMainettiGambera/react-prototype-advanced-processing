import SyncfusionUsersLocalTable from '@/components/users/SyncfusionUsersLocalTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users-syncfusion-local')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <SyncfusionUsersLocalTable />
}
