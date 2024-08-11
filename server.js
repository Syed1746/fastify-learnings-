const fastify = require('fastify')({ logger: true });
// fastify.register(require('fastify-swagger'),{
//     exposeRoute:true,
//     routePrefix:'/docs',
//     swagger:{
//         info:{
//             title: 'fastify-api',
//         },
//     },
// })
const PORT = 4000;

// const routes=require('./route/Items');

fastify.register(require('./route/Items'));

const start = async () => {
    try {
        await fastify.listen(PORT);
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
