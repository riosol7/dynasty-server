const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const downloadFantasyCalcRankings = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = 'https://www.fantasycalc.com/dynasty-rankings';

  await page.goto(url);

  // Click the download icon
  await page.click('.download-icon');

  // Wait for the download to complete
  await page.waitForFunction(() => {
    const downloadsPath = path.join(__dirname, '..', 'temp');
    const files = fs.readdirSync(downloadsPath);
    return files.some((file) => file.startsWith('fantasycalc_dynasty_rankings'));
  });

  // Find the downloaded file with the default name
  const downloadsPath = path.join(__dirname, '..', 'temp');
  const files = fs.readdirSync(downloadsPath);
  const downloadedFileName = files.find((file) => file.startsWith('fantasycalc_dynasty_rankings'));

  if (downloadedFileName) {
    const downloadedFilePath = path.join(downloadsPath, downloadedFileName);
    const tempFilePath = path.join(downloadsPath, 'fantasy_calc.csv');

    // Rename the file and change the delimiter to ','
    const csvData = fs.readFileSync(downloadedFilePath, 'utf8');
    const convertedData = csvData.replace(/;/g, ',');

    fs.writeFileSync(tempFilePath, convertedData);

    // Remove the original downloaded file
    fs.unlinkSync(downloadedFilePath);

    console.log(`CSV file downloaded, converted, and saved to ${tempFilePath}`);
  } else {
    console.error('Downloaded file not found.');
  }

  await browser.close();
};

// downloadFantasyCalcRankings().catch((error) => {
//   console.error('Error:', error);
// });
