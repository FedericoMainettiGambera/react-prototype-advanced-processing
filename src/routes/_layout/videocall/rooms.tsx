import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/videocall/rooms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Stanze</div>
}
