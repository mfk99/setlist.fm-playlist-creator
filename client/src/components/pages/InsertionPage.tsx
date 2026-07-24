import { useInputModeStore } from "../stores/input.store";
import { usePageModeStore } from "../stores/page.store";

export function InsertionPage() {
  const setInput = useInputModeStore((s) => s.setInput);
  const setPage = usePageModeStore((s) => s.setPage);
  return (
    <>
      <section id="center">
        <div>Enter the setlist.fm url below:</div>
        <input
          id="input-field"
          placeholder="https://www.setlist.fm/setlist/..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button id="insert-button" onClick={() => setPage("playlist")}>
          Generate playlist
        </button>
      </section>
    </>
  );
}
