import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  // beforeLoad: ({ context, location }) => {
  //   if (!context.isAuthed) {
  //     throw redirect({
  //       to: '/signin',
  //       search: {
  //         redirect: location.href,
  //       },
  //     })
  //   }
  // },
  component: Page,
})

function Page() {
  return <div>Home page</div>
}
