import puppeteer from "puppeteer";

export async function scrapePage(pageUrl: string) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();
    if (!page) {
      console.warn("Page is null");
      return;
    }

    await page.goto(pageUrl, { waitUntil: "networkidle0" });
    const songs = await page.$$eval(".songLabel", (elements) => {
      return elements.map((element) => element.textContent);
    });
    console.log("songs=", songs);

    await browser.close();
    return songs;
  } catch (err) {
    console.error(err);
  }
}
