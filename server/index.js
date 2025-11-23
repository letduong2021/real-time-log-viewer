const WebSocket = require('ws');

const webSocketService = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });

const levels = ['INFO', 'WARN', 'ERROR'];

function generateLog() {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const article = ["ERROR", "INFO"].includes(level) ? "an" : "a";
    return JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        message: `This is ${article} ${level} log message`
    });
}

webSocketService.on('connection', webSocket => {
    console.log('Client connected');

    const interval = setInterval(() => {
        if (webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(generateLog());
        }
    }, 1000);

    webSocket.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

console.log('WebSocket server running on ws://0.0.0.0:8080');
