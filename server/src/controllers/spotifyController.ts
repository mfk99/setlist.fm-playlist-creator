import { FRONTEND_URL, REDIRECT_URI } from "../config/env.js";
import querystring from "node:querystring";
import type { Request, Response } from "express";
import axios from "axios";

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

export async function login(_req: Request, res: Response) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  var state = generateRandomString(16);
  var scope = "playlist-modify-public playlist-modify-private";

  const params = querystring.stringify({
    response_type: "code",
    client_id,
    scope,
    redirect_uri: REDIRECT_URI,
    state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
}

export async function callback(req: Request, res: Response) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

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
      redirect_uri: REDIRECT_URI,
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
      const sessionToken = response.data.access_token;
      res.cookie("session", sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.redirect(FRONTEND_URL);
    } catch (error) {
      console.log("error:", error);
    }
  }
  res.redirect(FRONTEND_URL);
}

export async function token(req: Request, res: Response) {
  const token = await getSpotifyToken();
  res.send(token);
}

async function getSpotifyToken(): Promise<string> {
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
  return response.data.access_token;
}

export async function artist(req: Request, res: Response) {
  const { artistId, accessToken } = req.params;
  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  res.send(response.data);
}

export async function songs(req: Request, res: Response) {
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
}
