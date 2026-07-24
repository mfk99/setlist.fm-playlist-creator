import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePageModeStore } from "./components/stores/page.store";
import { InsertionPage } from "./components/pages/InsertionPage";
import { PlayListPage } from "./components/pages/PlayListPage";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const pageState = usePageModeStore((s) => s.pageMode);

  return (
    <QueryClientProvider client={queryClient}>
      {pageState === "insertion" && <InsertionPage />}
      {pageState === "playlist" && <PlayListPage />}
    </QueryClientProvider>
  );
}

export default App;
