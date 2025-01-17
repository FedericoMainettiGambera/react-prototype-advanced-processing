import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold">React + typescript + tailwind</h1>
    </QueryClientProvider>
  );
}

export default App;
