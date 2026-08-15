import axios from "axios";
import { useState } from "react";
import { useTokenStore } from "../stores/token.store";
import { BASE_URL } from "../utils/env";

export function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useTokenStore((s) => s.setToken);

  async function handleSpotifyLogin() {
    const response = await axios.get(`${BASE_URL}/spotify/token`);
    setToken(response.data);
    console.log("token received");
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
