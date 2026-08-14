import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInputModeStore } from "../stores/input.store";
import { useState } from "react";
import { useTokenStore } from "../stores/token.store";

async function fetchSongs(setlistUrl: string): Promise<string[]> {
  const response = await axios.get(
    "http://localhost:3000/page?url=" + setlistUrl,
  );
  return response.data;
}

async function fetchSongIds(
  songs: string[],
  artist: string,
  token: string,
): Promise<string[]> {
  let url = `http://localhost:3000/songs/artist/${artist}/token/${token}?`;
  for (const songName of songs) {
    url += `songId=${songName}&`;
  }
  url = url.substring(0, url.length - 1);
  const response = await axios.get(url);
  return response.data;
}

function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useTokenStore((s) => s.setToken);

  async function handleSpotifyLogin() {
    const response = await axios.get(
      `http://localhost:3000/login?username=${username}?password=${password}`,
    );
    setToken(response.data);
  }

  return (
    <>
      <div>To download the list, log in to Spotify below.</div>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSpotifyLogin}>
        Login
      </button>
    </>
  );
}

type SongCardProps = {
  songId: string;
};

function SongCard({ songId }: SongCardProps) {
  const songSrc = `https://open.spotify.com/embed/track/${songId}`;
  return (
    <iframe
      src={songSrc}
      width="50%"
      height="80"
      loading="lazy"
      frameBorder="0"
      style={{ borderRadius: "12px" }}
    ></iframe>
  );
}

function extractArtistName(): string {
  const input = useInputModeStore((s) => s.inputMode);
  const url = new URL(input);
  const pathParts = url.pathname.split("/");
  return pathParts[2];
}

type SongListProps = {
  songNameList: string[];
};

function SongList({ songNameList }: SongListProps) {
  const token = useTokenStore((s) => s.token);
  const artist = extractArtistName();
  const { data, isLoading, error } = useQuery({
    queryKey: ["songids"],
    queryFn: () => fetchSongIds(songNameList, artist, token),
    enabled: !!token && songNameList.length > 0,
  });
  if (!token || songNameList.length == 0) {
    return <></>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading song.</p>;

  return (
    <>
      {data?.map((songId) => (
        <SongCard key={songId} songId={songId} />
      ))}
    </>
  );
}

export function Songs() {
  const setlistUrl = useInputModeStore((s) => s.inputMode);
  const { data, isLoading, error } = useQuery({
    queryKey: ["songs", setlistUrl],
    queryFn: () => fetchSongs(setlistUrl),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading songs.</p>;
  console.log(data);
  return (
    <>
      <ul>
        {data?.map((song) => (
          <li key={song}>{song}</li>
        ))}
      </ul>
      <SpotifyLogin />
      <SongList songNameList={data ?? []} />
    </>
  );
}
