import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePageModeStore } from "./components/stores/page.store";
import { InsertionPage } from "./components/pages/InsertionPage";
import { PlayListPage } from "./components/pages/PlayListPage";
import "./App.css";
import { Header } from "./components/header/Header";
import { useTokenStore } from "./components/stores/token.store";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();
  const pageState = usePageModeStore((s) => s.pageMode);

  const fetchToken = useTokenStore((state) => state.fetchToken);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {pageState === "insertion" && <InsertionPage />}
      {pageState === "playlist" && <PlayListPage />}
    </QueryClientProvider>
  );
}

export default App;
