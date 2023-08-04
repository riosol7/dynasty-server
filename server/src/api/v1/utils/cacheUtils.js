const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1 hour cache duration

const fetchWithCaching = async (url, cacheKey) => {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        throw new Error(`API Request Failed: ${error.message}`);
    }
};

module.exports = { fetchWithCaching }