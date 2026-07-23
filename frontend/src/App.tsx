import "./App.css";

import { create } from "zustand";

type PageModeStore = {
  pageMode: string;
  setPage: (newPage: string) => void;
};

const usePageModeStore = create<PageModeStore>((set) => ({
  pageMode: "insertion",
  setPage: (newPage) => set({ pageMode: newPage }),
}));

type InputModeStore = {
  inputMode: string;
  setInput: (newInput: string) => void;
};

const useInputModeStore = create<InputModeStore>((set) => ({
  inputMode: "insertion",
  setInput: (newInput) => set({ inputMode: newInput }),
}));

function App() {
  const pageState = usePageModeStore((s) => s.pageMode);
  const setPage = usePageModeStore((s) => s.setPage);
  const inputState = useInputModeStore((s) => s.inputMode);
  const setInput = useInputModeStore((s) => s.setInput);

  if (pageState == "playlist") {
  }

  return (
    <>
      {pageState === "insertion" && (
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
      )}
      {pageState === "playlist" && (
        <>
          <section id="center">
            <div>XD</div>
            <div>{inputState}</div>
            <iframe
              data-testid="embed-iframe"
              // style="border-radius:12px"
              src="https://open.spotify.com/embed/track/0VPMvHXO7K1Ukj0DAmtvPs"
              // width="50%"
              // frameBorder="0"
              // allowfullscreen=""
              loading="lazy"
            ></iframe>
          </section>
        </>
      )}
    </>

    /*
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>*/
  );
}

export default App;
