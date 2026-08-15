import.meta.env;

export const BASE_URL = getBaseUrl();

function getBaseUrl(): string {
  if (import.meta.env.PROD || import.meta.env.VITE_LOCAL != "True") {
    console.log("PROD");
    return import.meta.env.VITE_PROD_BASE_URL;
  }
  if (import.meta.env.DEV) {
    console.log("DEV");
    return import.meta.env.VITE_DEV_BASE_URL;
  } else return "";
}
