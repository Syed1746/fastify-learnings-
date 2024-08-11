console.log("server is ready");
const fastify = require('fastify')({ logger: true });
const PORT = 4000;

fastify.get('/items', async (req, res) => {
    console.log('Received a request at /items');
    return { test: 'hello world' };
});

const start = async () => {
    try {
        console.log('Starting server...');
        await fastify.listen(PORT);
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
