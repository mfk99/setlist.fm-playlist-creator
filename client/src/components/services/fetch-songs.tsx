import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInputModeStore } from "../stores/input.store";
import { useTokenStore } from "../stores/token.store";
import { BASE_URL } from "../utils/env";
import { useSongIdStore } from "../stores/songId.store";
import { createPlayList } from "./playlist-service";

async function fetchSongs(setlistUrl: string): Promise<string[]> {
  const query = `${BASE_URL}/setlist/page?url=${setlistUrl}`;
  const response = await axios.get(query);
  return response.data;
}

async function fetchSongIds(
  songs: string[],
  artist: string,
  token: string,
): Promise<string[]> {
  let url = `${BASE_URL}/spotify/songs/artist/${artist}/token/${token}?`;
  for (const songName of songs) {
    url += `songId=${songName}&`;
  }
  url = url.substring(0, url.length - 1);
  const response = await axios.get(url);
  const appendToSongIds = useSongIdStore.getState().appendToSongIds;
  for (const id in response.data) appendToSongIds(id);
  return response.data;
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
    queryFn: () => fetchSongIds(songNameList, artist, token as string),
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
  return (
    <>
      <ul>
        {data?.map((song) => (
          <li key={song}>{song}</li>
        ))}
      </ul>
      <SongList songNameList={data ?? []} />
    </>
  );
}

export function DownLoadButton() {
  const songIds = useSongIdStore((s) => s.songIds);
  if (songIds.length == 0) return <></>;
  return (
    <button onClick={() => createPlayList(songIds)}>Add to Spotify</button>
  );
}
