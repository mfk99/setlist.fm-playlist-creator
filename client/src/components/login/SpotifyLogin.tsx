import { useState } from "react";

export function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSpotifyLogin() {
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
