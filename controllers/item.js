const {v4:uuidv4}= require('uuid');
let items = require('../items');
const getItems=(req,reply)=>{
    reply.send(items);
}
const getItem=(req,reply)=>{
    const {id}=req.params;

    const item=items.find((item)=>item.id===id);
    reply.send(item);
}

const exampleFunction = (e) => {
    if (typeof e === 'string') {
        return e.toLocaleUpperCase();
    }
    throw new Error('Expected a string');
};

const addItem = (req, reply) => {
    const { name } = req.body;
    if (typeof name !== 'string') {
        return reply.code(400).send({ error: 'Name must be a string' });
    }
    const item = {
        id: uuidv4(),
        name,
    };
    items = [...items, item];
    reply.code(201).send(item);
};


const deleteItem=(req,reply)=>{
    const {id}= req.params;
    items=items.filter((item)=>item.id!==id);
    reply.send({message:`item ${id} deleted successfully`});
}

const updateItem=(req,reply)=>{
    const {id}=req.params;
    const {name}=req.body;

    items=items.map((item)=>(item.id === id? {id,name}:item));

    const item=items.find((item)=>item.id===id);

    reply.send(item);
}
module.exports={
    getItem,
    getItems,
    addItem,
    deleteItem,
    updateItem,
}