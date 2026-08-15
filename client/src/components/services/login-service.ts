import axios from "axios";

export async function getCredentialStatus() {
  const response = await axios.get("/api/auth/me", {
    withCredentials: true,
  });

  console.log(response);
  console.log(response.data);
  return response.data;
}
