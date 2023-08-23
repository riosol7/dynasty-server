const fs = require("fs");
const csvParser = require("csv-parser");

async function parseCSV(csvFilePath) {
    try {
        const data = [];
        const fileStream = fs.createReadStream(csvFilePath);
        const parser = fileStream.pipe(csvParser({separator: ',', quote: '"',}));
        for await (const row of parser) {
            data.push({
                rank: row.rank || row.overallRank || null,
                player: row.player || row.name,
                team: row.team,
                position: row.position,
                positionRank: row.positionRank || null,
                age: parseFloat(row.age),
                tier: row.tier ? row.tier.trim() : null,
                trend: row.trend ? row.trend.trim() : null || row.trend30day || null,
                value: parseInt(row.value),
                fantasycalcId: row.fantasycalcId || null,
                sleeperId: row.sleeperId || null,
                mflId: row.mflId || null,
            });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { parseCSV }