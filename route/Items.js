const {getItem, getItems,addItem}=require('../controllers/item');
const item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    }
}

const getItemOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: item,
            }
        }
    },
    handler: getItems
}
const getItemOpts2 = {
    schema: {
        response: {
            200: item,
        }
    },
    handler: getItem
}

const postItemOpts={
    schema:{
        response:{
            201:item,
        },
    },
    handler:addItem,
}

const routes = (fastify, options, done) => {
    fastify.get('/', getItemOpts);

    fastify.get('/item/:id', getItemOpts2);

    fastify.post('/item',postItemOpts);

    done();
}

module.exports = routes;