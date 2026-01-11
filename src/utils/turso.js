import { createClient } from "@libsql/client";

const url = process.env.REACT_APP_TURSO_DATABASE_URL;
const authToken = process.env.REACT_APP_TURSO_AUTH_TOKEN;

if (!url) {
  console.error("REACT_APP_TURSO_DATABASE_URL is not defined in .env");
}

if (!authToken) {
  console.error("REACT_APP_TURSO_AUTH_TOKEN is not defined in .env");
}

export const turso = createClient({
  url: (url || "libsql://placeholder-url.turso.io").replace(/^libsql:\/\//, "https://"),
  authToken: authToken,
});
