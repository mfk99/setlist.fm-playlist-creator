export function SpotifyLogin() {
  const link = "/api/spotify/login";
  return (
    <>
      <div>To download the list, log in to Spotify.</div>
      <a href={link}>
        <button>Log into Spotify</button>
      </a>
    </>
  );
}
