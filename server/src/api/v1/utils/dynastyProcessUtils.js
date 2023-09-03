require("dotenv").config();
const csv = require('csv-parser');
const stream = require('stream');

const scrapeDynastyProcessRankings = async () => {
    try {
        const response = await fetch(process.env.DYNASTY_PROCESS_CSV_URL || "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const csvText = await response.text();
        const results = [];

        const csvStream = new stream.PassThrough();
        csvStream.end(csvText);

        const parseOptions = {
            headers: [
                "player", "position", "team", "age", "draft_year", 
                "ecr_1qb", "ecr_2qb", "ecr_pos", "value_1qb", 
                "value_2qb", "scrape_date", "fp_id"
            ],
            skipEmptyLines: true,
        };

        await new Promise((resolve, reject) => {
            csvStream.pipe(csv(parseOptions)).on('data', (data) => {
                results.push(data);
            }).on('end', () => {
                results.shift();
                resolve();
            }).on('error', (error) => {
                reject(error);
            });
        });

        return results;
    } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
        return null;
    }
};

module.exports =  { scrapeDynastyProcessRankings };