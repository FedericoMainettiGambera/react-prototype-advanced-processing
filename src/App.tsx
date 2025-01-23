import { registerLicense } from "@syncfusion/ej2-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ThemeProvider } from "./components/theme-provider";
import { env } from "./env/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./stores/auth";

registerLicense(env.VITE_SYNCFUSION_LICENSE_KEY);

ModuleRegistry.registerModules([AllCommunityModule]);


const router = createRouter({
  routeTree,
  context: {
    auth: {
      isSignedIn: false,
      subjectsLog: null,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

export function App() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider
          router={router}
          context={{
            auth,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
