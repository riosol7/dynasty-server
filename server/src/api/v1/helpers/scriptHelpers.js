const path = require("path");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache data for 1 hour
const { csvUtils, pythonUtils } = require("../utils")

const executeScript = async (filename) => {
    try {
        let data = cache.get(filename);
        if (!data) {
            const csvFilePath = path.join(__dirname, `../../../../temp/${filename}.csv`);
            await pythonUtils.executePythonScript(`${filename}.py`);
            data = await csvUtils.parseCSV(csvFilePath);
            cache.set(filename, data);
        }
        return data;

    } catch (err) {
        throw err
    }
};

module.exports = {
    executeScript,
};