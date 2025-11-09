import http from 'http';

const PORT = 3000;

export const startServer = () => {
    return http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is Running Successfully');
    })
        .listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
};