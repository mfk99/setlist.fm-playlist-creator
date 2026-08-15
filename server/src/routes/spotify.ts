import { Router } from "express";
import {
  login,
  token,
  callback,
  artist,
  songs,
  playlist,
} from "../controllers/spotifyController.js";

const spotifyRouter = Router();

spotifyRouter.get("/login", login);
spotifyRouter.get("/token", token);
spotifyRouter.get("/callback", callback);
spotifyRouter.get("/playlist", playlist);
spotifyRouter.get("/artist/:artistId/token/:accessToken", artist);
spotifyRouter.get("/songs/artist/:artist/token/:accessToken", songs);

export default spotifyRouter;
