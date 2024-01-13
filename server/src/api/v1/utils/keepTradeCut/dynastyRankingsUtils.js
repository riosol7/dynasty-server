const cheerio = require('cheerio');

const baseURL = `https://keeptradecut.com/dynasty-rankings`;
const totalPages = 10;

const fetchHTML = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        throw error;
    }
  };

const scrapeKTCDynastyRankings = async () => {
    const html = await fetchHTML(baseURL);
    const $ = cheerio.load(html);

    const playerData = [];

    for (let page = 0; page < totalPages; page++) {
        const url = `${baseURL}?page=${page}&filters=QB|WR|RB|TE|RDP&format=2`;
        const html = await fetchHTML(url);
        const $ = cheerio.load(html);

        $('.onePlayer').each((index, element) => {
            const playerName = $(element).find('p > a').text();
            const playerTeam = $(element).find('p > span.player-team').text();
            const playerPosition = $(element).find('.position-team').find('p:nth-of-type(1)').text();
            const playerAge = $(element).find('.position-team').find('p:nth-of-type(2)').text().split(' ')[0];
            const playerTier = $(element).find('.player-info').find('p.position').text().trim();
            const playerPath = $(element).find('p > a').attr('href');
            const playerValue = $(element).find('.value > p').text();
    
            // Extracting player trends
            const playerTrendElement = $(element).find('.trend > p');
            let playerTrend = playerTrendElement.text();
            
            // Handle the trend format similar to the Python script
            if (playerTrend.startsWith("0")) {
                playerTrend = playerTrend;
            } else if (playerTrendElement.hasClass('trend-up')) {
                playerTrend = playerTrend;
            } else if (playerTrendElement.hasClass('trend-down')) {
                playerTrend = "-" + playerTrend;
            };
    
            playerData.push({
                rank: index + 1,
                player: playerName,
                team: playerTeam,
                position: playerPosition,
                age: playerAge,
                tier: playerTier,
                trend: playerTrend,
                path: playerPath,
                value: playerValue,
            });
        });
    }

    return playerData;
};

module.exports = { scrapeKTCDynastyRankings };
