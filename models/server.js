
const express = require('express');
const {database} = require('../database.db');


class Server {


    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;
        this.conexionDB();
    }

    conexionDB(){
        
        database;
       
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = {
    Server
}