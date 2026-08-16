import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export async function queryDB(
  songName: string,
  artist: string,
): Promise<string | null> {
  try {
    const result = await pool.query(
      "SELECT * FROM songs WHERE song_name = $1 AND artist = $2",
      [songName, artist],
    );
    console.log(result.rows);
    if (result.rowCount == 0) return null;
    else return result.rows[0].spotify_id;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function insertIntoDB(
  songName: string,
  artist: string,
  spotidyId: string,
) {
  try {
    const result = await pool.query(
      "INSERT INTO songs (song_name, artist, spotify_id) VALUES ($1, $2, $3)",
      [songName, artist, spotidyId],
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
