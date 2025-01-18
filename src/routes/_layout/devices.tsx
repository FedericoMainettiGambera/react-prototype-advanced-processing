import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/devices')({
  component: Page,
})

function Page() {
  return <div>Devices page</div>
}
