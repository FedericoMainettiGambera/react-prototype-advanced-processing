import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
  component: Page,
})

function Page() {
  return <div>Users page</div>
}
