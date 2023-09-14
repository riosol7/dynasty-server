const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const scrapeFantasyCalcRankings = async () => {
  const scriptDirectory = __dirname;
  const tempFolder = path.join(scriptDirectory, 'temp');

  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = 'https://www.fantasycalc.com/dynasty-rankings';

  await page.goto(url);
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Click the download icon
  await page.click('.download-icon');

  // Wait for the download to start (you can adjust the timeout as needed)
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Assuming the downloaded file is in your system's default download directory
  const defaultDownloadPath = path.join(process.env.USERPROFILE || process.env.HOMEPATH, 'Downloads');

  // Find the downloaded file with the default name in the default download directory
  const files = fs.readdirSync(defaultDownloadPath);
  const downloadedFileName = files.find((file) => file.startsWith('fantasycalc_dynasty_rankings'));

  if (downloadedFileName) {
    const downloadedFilePath = path.join(defaultDownloadPath, downloadedFileName);
    const tempFilePath = path.join(tempFolder, 'fantasy_calc.csv');

    // Rename the file and change the delimiter to ','
    const csvData = fs.readFileSync(downloadedFilePath, 'utf8');
    const cleanedData = csvData.replace(/"([^"]+)"/g, '$1');

    // Change the delimiter to ','
    const convertedData = cleanedData.replace(/;/g, ',');
        
    fs.writeFileSync(tempFilePath, convertedData);

    // Remove the original downloaded file
    fs.unlinkSync(downloadedFilePath);

    console.log(`CSV file downloaded, converted, and saved to ${tempFilePath}`);

    // Parse the CSV data and return an array of players
    const players = [];

    const lines = convertedData.split('\n');
    if (lines.length > 1) {
      const header = lines[0].split(',').map((field) => field.trim()); // Trim field names
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((field) => field.trim()); // Trim field values
        const player = {};
        for (let j = 0; j < header.length; j++) {
          player[header[j]] = values[j];
        }
        players.push(player);
      }
    }

    return players;

  } else {
    console.error('Downloaded file not found.');
  }

  await browser.close();
};

module.exports = { scrapeFantasyCalcRankings }