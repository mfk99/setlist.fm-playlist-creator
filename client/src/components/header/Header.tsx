import { useQuery } from "@tanstack/react-query";
import { SpotifyLogin } from "../login/SpotifyLogin";
import { getCredentialStatus } from "../services/login-service";

export function Header() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["credentials"],
    queryFn: () => getCredentialStatus(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error checking credential status.</p>;

  if (!data.authenticated) {
    return <SpotifyLogin />;
  }

  return <>You're logged in!</>;
}
