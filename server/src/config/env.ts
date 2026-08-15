export const BASE_URL = determineBaseUrl();
export const FRONTEND_URL = determineFrontEndUrl();
export const REDIRECT_URI = `${BASE_URL}/spotify/callback`;

function determineBaseUrl() {
  const local = process.env.LOCAL;
  console.log("local:", local);
  if (local) return process.env.DEV_BASE_URL;
  return process.env.PROD_BASE_URL;
}

function determineFrontEndUrl() {
  const frontEndUrl = process.env.FRONTEND_URL;
  return frontEndUrl ? frontEndUrl : "";
}
