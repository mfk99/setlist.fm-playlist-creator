import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import type { Request, Response } from "express";

export default async function page(req: Request, res: Response) {
  const url = req.query.url as string;
  const data = await scrapePage(url);
  res.send(data);
}

async function launchBrowser() {
  if (process.env.NODE_ENV === "production") {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    return puppeteer.launch({ headless: true });
  }
}

async function scrapePage(pageUrl: string) {
  try {
    const browser = await launchBrowser();
    const [page] = await browser.pages();
    if (!page) {
      console.warn("Page is null");
      return;
    }

    await page.goto(pageUrl, { waitUntil: "networkidle0" });
    const songs = await page.$$eval(".songLabel", (elements) => {
      return elements.map((element) => element.textContent);
    });

    await browser.close();
    return songs;
  } catch (err) {
    console.error(err);
  }
}
