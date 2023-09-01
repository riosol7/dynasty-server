const { spawn } = require('child_process');

async function executePythonScript(filename) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [`./scripts/${filename}`]);
        pythonProcess.on('exit', (code) => {
            console.log(`Python script exited with code: ${code}`);
            if (code === 0) {
                console.log('Python script executed successfully');
                resolve();
            } else {
                const error = new Error('Error executing Python script');
                console.error('Python script execution error:', error);
                reject(error);
            }
        });
    });
}

module.exports = { executePythonScript }