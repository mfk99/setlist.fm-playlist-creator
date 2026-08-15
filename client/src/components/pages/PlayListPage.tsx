import { DownLoadButton, Songs } from "../services/fetch-songs";

export function PlayListPage() {
  return (
    <>
      <section id="center">
        <Songs />
        <DownLoadButton />
      </section>
    </>
  );
}
