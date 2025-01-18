import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppWrapper from "./components/layout/AppWrapper";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import AppRouter from "./router/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <BrowserRouter>
        <AppWrapper>
          <AppRouter />
        </AppWrapper>
      </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
