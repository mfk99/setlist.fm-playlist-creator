import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";
import { scrapePage } from "./data-retriever.js";

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
