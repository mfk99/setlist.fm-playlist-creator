import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInputModeStore } from "../stores/input.store";
import { useState } from "react";

async function fetchSongs(setlistUrl: string): Promise<string[]> {
  const response = await axios.get(
    "http://localhost:3000/page?url=" + setlistUrl,
  );
  return response.data;
}

function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSpotifyLogin() {
    console.log(username, password);
    const response = await axios.get(
      `http://localhost:3000/login?username=${username}?password=${password}`,
    );
    console.log("response:", response);
    console.log("response.data:", response.data);
    return response.data;
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
      <SpotifyLogin />
    </>
  );
}
