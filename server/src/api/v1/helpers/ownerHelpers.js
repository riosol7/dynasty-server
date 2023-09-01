const { Owner } = require("../models")
const { sleeperAPI } = require("../../../../api")
const { fetchUpdatedKTCPlayerData } = require("./playerHelpers");

// FUTURE TASK:
// Implement a condition to check if there are new users that are not in the DB by fetching user data.
const getOwners = async () => {
    const owners = await Owner.find({}).lean();
    const [rosterData, players] = await Promise.all([
        sleeperAPI.fetchRosterData(),
        fetchUpdatedKTCPlayerData(),
    ]);

    const updatedOwners = await Promise.all(owners.map(async owner => {
        const checkedOwnerAvatar = updateOwnerAvatar(owner);
        const foundRoster = rosterData.find(roster => roster.roster_id === owner.roster_id);
        return await getDynastyValue(foundRoster, checkedOwnerAvatar, players);
    }));
    return updatedOwners
}

const getDynastyValue = async (roster, owner, players) => {
    const positions = ["QB", "RB", "WR", "TE"];
    const ratings = {};

    for (const position of positions) {
        const positionPlayers = players.filter(
            (player) => roster.players.includes(player.player_id) && player.position === position
        );

        const ratingSum = positionPlayers.reduce((acc, player) => acc + (player.value || 0), 0);
        ratings[`${position.toLowerCase()}Rating`] = ratingSum;
    }

    const teamRating = positions.reduce((acc, position) => acc + ratings[`${position.toLowerCase()}Rating`], 0);
    ratings['teamRating'] = teamRating;

    return await updateOwnerDynastyValue(owner, ratings);
};

const updateOwnerAvatar = async (owner) => {
    const latestUsers = await sleeperAPI.fetchUsers();
    const foundUser = latestUsers.find(user => user.user_id === owner.user_id);
    if (foundUser.avatar !== owner.avatar) {
        return await Owner.findOneAndUpdate({"user_id": foundUser.user_id},
        { $set: { "avatar": foundUser.avatar }}, {new:true});
    }; 
    return owner;
};

const updateOwnerDynastyValue = async (owner, ratings) => {
    const { teamRating, qbRating, rbRating, wrRating, teRating } = ratings;
    const currentDate = new Date().toLocaleDateString().split('T')[0];
    const updatedOwner = await Owner.findOneAndUpdate(
        {
            "user_id": owner.user_id,
            "team_rating.date": { $ne: currentDate },
        },
        {
            $addToSet: {
                "team_rating": {
                    "date": currentDate,
                    "value": teamRating,
                },
                "qb_rating": {
                    "date": currentDate,
                    "value": qbRating,
                },
                "rb_rating": {
                    "date": currentDate,
                    "value": rbRating,
                },
                "wr_rating": {
                    "date": currentDate,
                    "value": wrRating,
                },
                "te_rating": {
                    "date": currentDate,
                    "value": teRating,
                },
            },
        },
        { new: true }
    );
    return updatedOwner || owner;
};
 
module.exports = { 
    getOwners,
}