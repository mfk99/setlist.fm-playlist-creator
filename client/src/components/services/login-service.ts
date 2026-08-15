import axios from "axios";

export async function getCredentialStatus() {
  const response = await axios.get(
    "https://setlist-fm-playlist-creator.vercel.app/auth/me",
    {
      withCredentials: true,
    },
  );

  console.log(response);
  console.log(response.data);
  return response.data;
}
