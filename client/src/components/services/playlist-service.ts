import axios from "axios";
import { BASE_URL } from "../utils/env";

export async function createPlayList(songIds: string[]) {
  let url = `${BASE_URL}/spotify/playlist?`;
  for (const id of songIds) {
    url += `songId=${id}&`;
  }
  url = url.substring(0, url.length - 1);
  const response = await axios.get(url, {
    withCredentials: true,
  });
}
