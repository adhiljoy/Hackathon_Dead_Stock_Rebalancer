import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await client.execute(
      "SELECT * FROM inventory"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Inventory API error:", error);
    res.status(500).json({ error: error.message });
  }
}
