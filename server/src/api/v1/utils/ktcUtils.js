require("dotenv").config()
const puppeteer = require('puppeteer');

const getKTCPlayerValues = async (path) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Define the URL to scrape
    const url = `${process.env.KTC_PLAYER_BASE_URL}${path}`;

    await page.goto(url);

    // Wait for the "All Time" button to be available and click it
    await page.waitForSelector('div[data-attr="0"]');
    await page.click('div[data-attr="0"]');

    // Wait for the content to load (you might need to adjust the timeout)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Extract data from the specified container
    const data = await page.evaluate(() => {
        const dates = [];
        const values = [];

        const hoverGroups = document.querySelectorAll('.pd-value-graph-wrapper.pd-graph-wrapper g.hoverGroup');

        hoverGroups.forEach((hoverGroup) => {
            const hoverDate = hoverGroup.querySelector('text.hoverDate').textContent.trim();
            const graphVal = hoverGroup.querySelector('text.graphVal.hoverVal').textContent.trim();
            dates.push(hoverDate);
            values.push(graphVal);
        });

        return { date: dates, value: values };
    });

    await browser.close();

    console.log('Data has been scraped');
    return data;
};

module.exports = { getKTCPlayerValues };