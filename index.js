import puppeteer from "puppeteer";

const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://www.winamax.fr/paris-sportifs/history/", {
    waitUntil: "domcontentloaded",
  });

  const quotes = await page.evaluate(() => {
    const quoteList = document.querySelectorAll(".bYKroy");

    return Array.from(quoteList).map((quote) => {
      const status = quote.querySelector(".hzQKZq").innerText;
      const type = quote.querySelector(".cjHaWb").innerText;

      return { status, type };
    });
  });

  console.log(quotes);

  //await page.click(".pager > .next > a");

  await browser.close();
};

// Start the scraping
getQuotes();