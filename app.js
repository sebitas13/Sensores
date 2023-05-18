var cron = require('node-cron');
require('dotenv').config();

const {Server} = require('./models/server');

const server = new Server();


server.listen();


cron.schedule("*/9 * * * * *", ()=>{
    console.log('tarea programada cada 10 segundos');
    Server.tarea();
});