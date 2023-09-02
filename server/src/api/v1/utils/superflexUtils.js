const puppeteer = require('puppeteer');

const scrapeSuperFlexRankings = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = 'https://www.dynastysuperflex.com/sf_values';
  await page.goto(url);

  // Wait for the table to load
  await page.waitForSelector('#player-values-table tbody tr');

  // Extract and display the data
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

  console.log('Superflex Player Data:', data);

  await browser.close();
};

scrapeSuperFlexRankings()

module.exports = { scrapeSuperFlexRankings };