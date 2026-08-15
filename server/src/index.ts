import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import corsConfig from "./config/cors.js";
import spotifyRouter from "./routes/spotify.js";
import setlistRouter from "./routes/setlist.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = "3000";

app.use(corsConfig());
app.use(cookieParser());

app.use("/spotify", spotifyRouter);
app.use("/setlist", setlistRouter);
app.use("/auth", authRouter);

app.listen(port, () => {});
