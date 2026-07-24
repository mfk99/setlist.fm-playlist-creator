import { usePageModeStore } from "./components/stores/page.store";
import { InsertionPage } from "./components/pages/InsertionPage";
import { PlayListPage } from "./components/pages/PlayListPage";
import "./App.css";

function App() {
  const pageState = usePageModeStore((s) => s.pageMode);

  return (
    <>
      {pageState === "insertion" && <InsertionPage />}
      {pageState === "playlist" && <PlayListPage />}
    </>
  );
}

export default App;
