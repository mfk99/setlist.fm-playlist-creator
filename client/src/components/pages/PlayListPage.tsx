import { useInputModeStore } from "../stores/input.store";

export function PlayListPage() {
  const inputState = useInputModeStore((s) => s.inputMode);
  return (
    <>
      <section id="center">
        <div>The playlist will be displayed here</div>
        <div>{inputState}</div>
        {/* <iframe
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/track/0VPMvHXO7K1Ukj0DAmtvPs"
          loading="lazy"
        ></iframe> */}
      </section>
    </>
  );
}
