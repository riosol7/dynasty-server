require('dotenv').config();
const csv = require('csv-parser');

const fetchFantasyProData = async () => {
  try {
        const response = await fetch(process.env.FANTASY_PRO_CSV_URL || "https://raw.githubusercontent.com/dynastyprocess/data/master/files/fp_latest_weekly.csv");

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const results = [];

        const parseOptions = {
            headers: [
                "page",
                "page_pos",
                "scrape_date",
                "fantasypros_id",
                "player_name",
                "pos",
                "team",
                "rank",
                "ecr",
                "sd",
                "best",
                "worst",
                "sportradar_id",
                "yahoo_id",
                "cbs_id",
                "player_positions",
                "player_short_name",
                "player_eligibility",
                "player_yahoo_positions",
                "player_page_url",
                "player_filename",
                "player_square_image_url",
                "player_image_url",
                "player_bye_week",
                "player_owned_avg",
                "player_owned_espn",
                "player_owned_yahoo",
                "player_opponent",
                "player_opponent_id",
                "player_ecr_delta",
                "pos_rank",
                "start_sit_grade",
                "r2p_pts",
            ],
            skipEmptyLines: true,
        };

        const responseText = await response.text();
        const csvStream = csv(parseOptions);
        csvStream.write(responseText);
        csvStream.end();

        await new Promise((resolve) => {
            csvStream.on('data', (data) => {
                results.push(data);
            });
            csvStream.on('end', () => {
                resolve();
            });
        });

        return results;
    
    } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
        return null;
    }
};

module.exports = { fetchFantasyProData };