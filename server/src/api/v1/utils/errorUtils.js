const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

function handleError(res, err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing the request." });
}

const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`API Request Failed: ${error.message}`);
  }
};

module.exports = { 
    handleError, 
    fetchWithErrorHandling
};