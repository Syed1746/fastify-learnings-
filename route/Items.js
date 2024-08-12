const {getItem, getItems,addItem,deleteItem,updateItem}=require('../controllers/item');
const { sendWhatsAppMessage } = require('../controllers/whatsapp');
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
        body:{
            type:'object',
            required:['name'],
            properties:{
                name:{type:'string'}
            },
        },
        response:{
            200:item,
        }
    },
    handler:addItem,
};

const deleteItemOpts={
    schema:{
        response:{
            200:{
                type:'object',
                properties:{
                    message:{type:'string'},
                },
            },
        },
    },
    handler:deleteItem,
}

const updateItemOpts={
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        },
        response: {
            200: item
        }
    },
    handler:updateItem,
}

const routes = (fastify, options, done) => {

    
    fastify.get('/', getItemOpts);
    fastify.get('/item/:id', getItemOpts2);
    fastify.post('/item', postItemOpts); // Ensure this is correctly registered

    fastify.delete('/item/:id',deleteItemOpts);

    fastify.put('/item/:id',updateItemOpts);

     // New route for sending WhatsApp messages
     fastify.post('/send-whatsapp', sendWhatsAppMessage);

    done();
}


module.exports = routes;