const puppeteer = require('puppeteer');

const scrapeSuperFlexRankings = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = 'https://www.dynastysuperflex.com/sf_values';
  await page.goto(url);

  const playerData = [];

    while (true) {
        // Wait for the table to load
        await page.waitForSelector('#player-values-table tbody tr');

        // Extract data from the current page
        const data = await page.evaluate(() => {
        const rows = document.querySelectorAll('#player-values-table tbody tr');
        const playerData = [];

        rows.forEach((row, i) => {
            const columns = row.querySelectorAll('td');
            const rank = i + 1;
            const player = columns[0].textContent.trim().split(' (')[0];
            const position = columns[5].textContent.trim();
            const positionRank = columns[1].textContent.trim();
            const team = columns[2].textContent.trim();
            const age = columns[3].textContent.trim();
            const value = columns[4].textContent.trim();

            playerData.push({
            rank,
            player,
            position,
            positionRank,
            team,
            age,
            value,
            });
        });

        return playerData;
        });

        playerData.push(...data);

        // Check if there's a "Next" button
        const nextButton = await page.evaluate(() => {
            const nextButton = document.querySelector('#player-values-table_next');
            return nextButton ? !nextButton.classList.contains('disabled') : false;
        });

        if (nextButton) {
            await page.click('#player-values-table_next');
            await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
            break;
        }
    }

    await browser.close();

    return playerData;
};

module.exports = { scrapeSuperFlexRankings };