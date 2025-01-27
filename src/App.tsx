import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import "ag-grid-enterprise";
import { ServerSideRowModelModule } from "ag-grid-enterprise";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./stores/auth";

ModuleRegistry.registerModules([AllCommunityModule, ServerSideRowModelModule]);


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
