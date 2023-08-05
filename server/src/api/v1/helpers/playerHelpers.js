const path = require("path");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache data for 1 hour
const { sleeperAPI } = require("../../../../api")
const { csvUtils, pythonUtils } = require("../utils")
const { KCT, Player } = require("../models")
const validPositions = ["QB", "RB", "WR", "TE", "K", "DEF"];

async function createKCTDataMap(csvData) {
    return new Map(csvData.map(item => [item.player, item]));
}

const filterPlayerDataFromSleeper = (playerData) => {
    return Object.values(playerData)
        .filter((player) => player.active && validPositions.includes(player.position))
        .map((player) => ({
            age: player.age,
            birth_date: player.birth_date,
            college: player.college,
            depth_chart_order: player.depth_chart_order,
            espn_id: player.espn_id,
            fantasy_data_id: player.fantasy_data_id,
            first_name: player.first_name,
            full_name: player.full_name,
            height: player.height,
            high_school: player.high_school,
            last_name: player.last_name,
            number: player.number,
            player_id: player.player_id,
            position: player.position,
            position_rank: player.position_rank,
            rank: player.rank,
            rating: player.rating,
            rotowire_id: player.rotowire_id,
            sportradar_id: player.sportradar_id,
            team: player.team,
            tier: player.tier,
            trend: player.trend,
            weight: player.weight,
            yahoo_id: player.yahoo_id,
            years_exp: player.years_exp,
        }));
};

const updatePlayerCollection = async (players) => {
    await Player.deleteMany({});
    await Player.insertMany(players);
};

const updateKCTCollection = async (csvData) => {
    await KCT.deleteMany({});
    await KCT.insertMany(csvData);
};

async function updatePlayersWithKCTData(players, kctDataMap) {
    for (const player of players) {
        const foundKCTPlayer = kctDataMap.get(player.full_name);
        if (foundKCTPlayer) {
            player.age = foundKCTPlayer.age || player.age;
            player.rank = foundKCTPlayer.rank || player.rank;
            player.position_rank = foundKCTPlayer.position || player.position_rank;
            player.rating = foundKCTPlayer.rating || player.rating;
            player.tier = foundKCTPlayer.tier || player.tier;
            player.trend = foundKCTPlayer.trend || player.trend;
        }
    }
    return players;
}

async function insertPlayerDataIntoMongoDB(players,csvData) {
    try {
        const [_, kctDataMap] = await Promise.all([
            updateKCTCollection(csvData),
            createKCTDataMap(csvData)
        ]);
        const updatedPlayers = await updatePlayersWithKCTData(players, kctDataMap);
        await updatePlayerCollection(updatedPlayers)
        console.log('Data inserted successfully');
        return updatedPlayers;

    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

async function fetchUpdatedPlayerData() {
    const csvFilePath = path.join(__dirname, '../../../../temp/player_data.csv');

    try {
        let updatedPlayersData = cache.get('updatedPlayersData');
    
        if (!updatedPlayersData) {
            const [playerData, _] = await Promise.all([sleeperAPI.fetchPlayerData(),pythonUtils.executeKCTRankingsScript()])
            const [filteredPlayers, csvData] = await Promise.all([filterPlayerDataFromSleeper(playerData), csvUtils.parseCSV(csvFilePath)]);
            updatedPlayersData = await insertPlayerDataIntoMongoDB(filteredPlayers, csvData);
            cache.set('updatedPlayersData', updatedPlayersData);
        }
        return updatedPlayersData;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchUpdatedPlayerData,
};