const path = require("path");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache data for 1 hour
const { sleeperAPI } = require("../../../../api")
const { csvUtils, ktcUtils, pythonUtils } = require("../utils")
const { KTC, Player } = require("../models")
const validPositions = ["QB", "RB", "WR", "TE", "K", "DEF"];

async function createKTCDataMap(csvData) {
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
            rotowire_id: player.rotowire_id,
            sportradar_id: player.sportradar_id,
            team: player.team,
            tier: player.tier,
            trend: player.trend,
            value: player.value,
            weight: player.weight,
            yahoo_id: player.yahoo_id,
            years_exp: player.years_exp,
        }));
};

const updatePlayerCollection = async (players) => {
    await Player.collection.drop();
    await Player.insertMany(players);
};

const updateKTCCollection = async (csvData) => {
    await KTC.deleteMany({});
    await KTC.insertMany(csvData);
};

async function updatePlayersWithKTCData(players, ktcDataMap) {
    for (const player of players) {
        const foundKTCPlayer = ktcDataMap.get(player.full_name);
        if (foundKTCPlayer) {
            player.age = foundKTCPlayer.age || player.age;
            player.rank = foundKTCPlayer.rank || player.rank;
            player.position_rank = foundKTCPlayer.position || player.position_rank;
            player.value = foundKTCPlayer.value || player.value;
            player.tier = foundKTCPlayer.tier || player.tier;
            player.trend = foundKTCPlayer.trend || player.trend;
        }
    }
    return players;
}

async function insertPlayerDataIntoMongoDB(players,csvData) {
    try {
        const [_, ktcDataMap] = await Promise.all([
            updateKTCCollection(csvData),
            createKTCDataMap(csvData)
        ]);
        const updatedPlayers = await updatePlayersWithKTCData(players, ktcDataMap);
        await updatePlayerCollection(updatedPlayers)
        console.log('Data inserted successfully');
        return updatedPlayers;

    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

async function fetchUpdatedPlayerData() {
    const csvFilePath = path.join(__dirname, '../../../../temp/ktc.csv');

    try {
        let updatedPlayersData = cache.get('updatedPlayersData');
    
        if (!updatedPlayersData) {
            const [playerData, _] = await Promise.all([sleeperAPI.fetchPlayerData(),pythonUtils.executePythonScript('ktc.py')])
            const [filteredPlayers, csvData] = await Promise.all([filterPlayerDataFromSleeper(playerData), csvUtils.parseCSV(csvFilePath)]);
            updatedPlayersData = await insertPlayerDataIntoMongoDB(filteredPlayers, csvData);
            cache.set('updatedPlayersData', updatedPlayersData);
        };
        return updatedPlayersData;
    } catch (err) {
        throw err;
    }
}

const scrapeKTCPlayerValues = async (path) => {
    let data = cache.get(`${path}`);
    if(!data) {
        data = ktcUtils.getKTCPlayerValues(path);
        cache.set(`${path}`, data);
    };
    return data;
}

const fetchPlayerData = async () => {
    let filteredPlayerData = cache.get('filteredPlayerData');
    
    if (!filteredPlayerData) {
        const playerData = await sleeperAPI.fetchPlayerData()
        filteredPlayerData = await filterPlayerDataFromSleeper(playerData);
        cache.set('filteredPlayerData', filteredPlayerData);
    };
    return filteredPlayerData;
};

module.exports = {
    fetchPlayerData,
    fetchUpdatedPlayerData,
    scrapeKTCPlayerValues,
};