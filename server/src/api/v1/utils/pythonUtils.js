const { spawn } = require('child_process');

async function executeKCTRankingsScript() {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['./scripts/kct_rankings.py']);
        pythonProcess.on('exit', (code) => {
            if (code === 0) {
                console.log('Python script executed successfully');
                resolve();
            } else {
                reject(new Error('Error executing Python script'));
            }
        });
    });
}

module.exports = { executeKCTRankingsScript }