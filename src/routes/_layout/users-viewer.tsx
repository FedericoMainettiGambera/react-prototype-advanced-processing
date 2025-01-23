import UsersDataViewer from '@/components/users/UsersDataViewer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users-viewer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersDataViewer />
}
