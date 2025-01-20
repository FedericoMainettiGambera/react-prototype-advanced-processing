import CameraPage from '@/components/camera/Camera'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/camera')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CameraPage />
}
