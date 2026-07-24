import express from "express";
import { scrapePage } from "./data-retriever.js";

const app = express();
const port = "3000";

app.get("/", (req, res) => {});

app.get("/page", async (req, res) => {
  const url = req.query.url as string;
  const data = await scrapePage(url);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
