import express, { response } from "express";

import axios from "axios";
import "dotenv/config";

import cors from "./config/cors.js";
import spotifyRouter from "./routes/spotify.js";
import setlistRouter from "./routes/setlist.js";

const app = express();
const port = "3000";

app.use(cors);

app.use("/spotify", spotifyRouter);
app.use("/setlist", setlistRouter);

app.listen(port, () => {});
