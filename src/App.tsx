import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./components/layout/AppWrapper";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import AppRouter from "./router/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppWrapper>
            <AppRouter />
          </AppWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
