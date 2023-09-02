const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const downloadFantasyCalcRankings = async () => {
  const scriptDirectory = __dirname;
  const tempFolder = path.join(scriptDirectory, 'temp');

  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = 'https://www.fantasycalc.com/dynasty-rankings';

  await page.goto(url);
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Click the download icon
  await page.click('.download-icon');

  // Wait for the download to start (you can adjust the timeout as needed)
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Assuming the downloaded file is in your system's default download directory
  const defaultDownloadPath = path.join(process.env.HOME, 'Downloads');

  // Find the downloaded file with the default name in the default download directory
  const files = fs.readdirSync(defaultDownloadPath);
  const downloadedFileName = files.find((file) => file.startsWith('fantasycalc_dynasty_rankings'));

  if (downloadedFileName) {
    const downloadedFilePath = path.join(defaultDownloadPath, downloadedFileName);
    const tempFilePath = path.join(tempFolder, 'fantasy_calc.csv');

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

downloadFantasyCalcRankings().catch((error) => {
  console.error('Error:', error);
});
