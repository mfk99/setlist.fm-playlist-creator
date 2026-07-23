import express from "express";
import { scrapePage } from "./data-retriever.js";

const app = express();
const port = "3000";

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
  console.log(
    scrapePage(
      "https://www.setlist.fm/setlist/architects/2026/laulurinne-joensuu-finland-33498845.html",
    ),
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
