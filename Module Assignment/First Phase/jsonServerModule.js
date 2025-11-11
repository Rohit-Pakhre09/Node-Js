import http from 'http';

const PORT = 3001;

const sampleData = {
    message: "Hello from JSON Server!",
    timestamp: new Date().toISOString(),
    info: {
        name: "Sample API",
        version: "1.0",
        endpoints: ["/"]
    }
};

export const startJSONServer = () => {
    return http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        const data = {
            ...sampleData,
            timestamp: new Date().toISOString()
        };
        res.end(JSON.stringify(data, null, 2));
    })
        .listen(PORT, () => {
            console.log(`JSON Server is running at http://localhost:${PORT}`);
        });
};