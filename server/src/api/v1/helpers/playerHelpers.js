const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache data for 1 hour
const { sleeperAPI } = require("../../../../api")
const { ktcUtils, ktcDynasty, fantasyCalcUtils, superFlexUtils, dynastyProcessUtils, fantasyProUtils } = require("../utils")
const validPositions = ["QB", "RB", "WR", "TE", "K", "DEF"];

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
            injury_body_part: player.injury_body_part,
            injury_notes: player.injury_notes,
            injury_start_date: player.injury_start_date,
            injury_status: player.injury_status,
            last_name: player.last_name,
            news_updated: player.news_updated,
            number: player.number,
            player_id: player.player_id,
            position: player.position,
            rotowire_id: player.rotowire_id,
            sportradar_id: player.sportradar_id,
            team: player.team,
            weight: player.weight,
            yahoo_id: player.yahoo_id,
            years_exp: player.years_exp,
        }));
};

const fetchPlayerData = async () => {
    let filteredPlayerData = cache.get('filteredPlayerData');
    
    if (!filteredPlayerData) {
        const playerData = await sleeperAPI.fetchPlayerData()
        filteredPlayerData = await filterPlayerDataFromSleeper(playerData);
        cache.set('filteredPlayerData', filteredPlayerData);
    };
    return filteredPlayerData;
};

const getKTCPlayerValues = async (path) => {
    let data = cache.get(`${path}`);
    
    if (!data) {
        data = ktcUtils.scrapeKTCPlayerValues(path);
        cache.set(`${path}`, data);
    };
    return data;
};

const scrapeListOfKTCDynastyRankings = async () => {
    let data = cache.get(`ktcRankings`);
    
    if (!data) {
        data = await ktcDynasty.scrapeKTCDynastyRankings();
        cache.set(`ktcRankings`, data);
    };

    return data;
};

const scrapeListOfFantasyCalcRankings = async () => {
    let data = cache.get(`fcRankings`);
    if (!data) {
        data = await fantasyCalcUtils.scrapeFantasyCalcRankings();
        cache.set(`fcRankings`, data);
    };

    return data;
};

const scrapeListOfSuperFlexRankings = async () => {
    let data = cache.get(`sfRankings`);
    if (!data) {
        data = await superFlexUtils.scrapeSuperFlexRankings();
        cache.set(`sfRankings`, data);
    };

    return data;
};

const scrapeListOfDynastyProcessRankings = async () => {
    let data = cache.get(`dpRankings`);
    if (!data) {
        data = await dynastyProcessUtils.scrapeDynastyProcessRankings();
        cache.set(`dpRankings`, data);
    };

    return data;
};

const scrapeListOfFantasyPro = async () => {
    let data = cache.get(`fantasyPro`);
    if (!data) {
        data = await fantasyProUtils.scrapeFantasyPro();
        cache.set(`fantasyPro`, data);
    };

    return data;
};

module.exports = {
    fetchPlayerData,
    getKTCPlayerValues,
    scrapeListOfKTCDynastyRankings,
    scrapeListOfFantasyCalcRankings,
    scrapeListOfSuperFlexRankings,
    scrapeListOfDynastyProcessRankings,
    scrapeListOfFantasyPro,
};