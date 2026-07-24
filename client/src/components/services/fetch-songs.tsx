import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInputModeStore } from "../stores/input.store";

async function fetchSongs(setlistUrl: string): Promise<string[]> {
  const response = await axios.get(
    "http://localhost:3000/page?url=" + setlistUrl,
  );
  // const response = await axios.get("http://localhost:3000/page?url=" + url);
  return response.data;
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
    <ul>
      {data?.map((song) => (
        <li key={song}>{song}</li>
      ))}
    </ul>
  );
}
