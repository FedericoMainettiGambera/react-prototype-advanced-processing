import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppWrapper from "./components/layout/AppWrapper";
import "./index.css";
import AppRouter from "./router/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWrapper>
          <AppRouter />
        </AppWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
