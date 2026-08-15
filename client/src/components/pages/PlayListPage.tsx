import { Songs } from "../services/fetch-songs";

export function PlayListPage() {
  return (
    <>
      <section id="center">
        <Songs />
      </section>
    </>
  );
}
