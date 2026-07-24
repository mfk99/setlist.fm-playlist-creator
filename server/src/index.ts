import express from "express";
import cors from "cors";
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
