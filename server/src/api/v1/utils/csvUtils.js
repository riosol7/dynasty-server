const fs = require("fs");
const csvParser = require("csv-parser");

async function parseCSV(csvFilePath) {
    try {
        const data = [];
        const fileStream = fs.createReadStream(csvFilePath);
        const parser = fileStream.pipe(csvParser());
        for await (const row of parser) {
            data.push({
                rank: row.rank,
                player: row.player,
                team: row.team,
                position: row.position,
                age: parseFloat(row.age),
                tier: row.tier.trim(),
                trend: row.trend.trim(),
                rating: parseInt(row.rating),
            });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { parseCSV }