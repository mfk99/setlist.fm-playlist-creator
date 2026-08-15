import axios from "axios";
import { BASE_URL } from "../utils/env";

export async function getCredentialStatus() {
  const response = await axios.get(`${BASE_URL}/auth/me`, {
    withCredentials: true,
  });

  console.log(response);
  console.log(response.data);
  return response.data;
}
