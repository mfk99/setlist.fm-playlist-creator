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
    const data = await page.evaluate(
      () => document.querySelector(".setlistList")?.outerHTML,
    );

    console.log(data);

    await browser.close();
    return data;
  } catch (err) {
    console.error(err);
  }
}
