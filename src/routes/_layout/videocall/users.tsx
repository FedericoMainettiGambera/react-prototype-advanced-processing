import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/videocall/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Utenti</div>
}
