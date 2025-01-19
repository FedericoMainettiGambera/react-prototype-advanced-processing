import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/user/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <div>user: {id}</div>
}
