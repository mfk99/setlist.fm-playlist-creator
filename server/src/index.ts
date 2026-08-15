import express, { response } from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";
import querystring from "node:querystring";
import { scrapePage } from "./data-retriever.js";
import { BASE_URL, FRONTEND_URL } from "./utils/env.js";

const app = express();
const port = "3000";

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }

      return callback(null, true);
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {});

app.get("/page", async (req, res) => {
  const url = req.query.url as string;
  const data = await scrapePage(url);
  res.send(data);
});

app.get("/login", async (req, res) => {
  const username = req.query.username as string;
  const password = req.query.password as string;
  const token = await requestLogin(username, password);
  res.send(token);
});

app.get("/artist/:artistId/token/:accessToken", async (req, res) => {
  const { artistId, accessToken } = req.params;
  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  res.send(response.data);
});

https: app.get("/songs/artist/:artist/token/:accessToken", async (req, res) => {
  const { artist, accessToken } = req.params;
  const songIds = req.query.songId as any;
  console.log("songIds:", songIds);

  const dataArray: any[] = [];
  for (const songId of songIds) {
    console.log(songId);
    const response = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/search`,
      params: {
        q: `track:${songId} artist:${artist}`,
        type: "track",
        limit: 1,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    dataArray.push(response.data.tracks.items[0].id);
  }

  res.send(dataArray);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

async function requestLogin(
  username: string,
  password: string,
): Promise<string> {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      grant_type: "client_credentials",
      client_id: client_id,
      client_secret: client_secret,
    },
  });
  console.log(response.data.access_token);
  return response.data.access_token;
}

const redirect_uri = `${BASE_URL}/spotify/callback`;

function generateRandomString(length: number): string {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/spotify/login", (req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  var state = generateRandomString(16);
  var scope = "playlist-modify-public playlist-modify-private";

  const params = querystring.stringify({
    response_type: "code",
    client_id,
    scope,
    redirect_uri: redirect_uri,
    state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

app.get("/spotify/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  console.log("code:", code);
  console.log("state:", state);

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        }),
    );
  } else {
    const params = new URLSearchParams({
      code: code as string,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    });

    try {
      const response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: params,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      });
    } catch (error) {
      console.log("error:", error);
      console.log("response:", response);
    }
  }
  res.redirect(FRONTEND_URL);
});
