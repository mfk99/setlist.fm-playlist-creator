import express from "express";
import "dotenv/config";

import corsConfig from "./config/cors.js";
import spotifyRouter from "./routes/spotify.js";
import setlistRouter from "./routes/setlist.js";

const app = express();
const port = "3000";

app.use(corsConfig());

app.use("/spotify", spotifyRouter);
app.use("/setlist", setlistRouter);

app.listen(port, () => {});
