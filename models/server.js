
const express = require('express');
const {database} = require('../database/config.db');
const cors = require('cors');


class Server {


    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;
        this._usuariosPath = '/api/usuarios'
        
        
        this.conexionDB();
        this.middlewares();
        this.routes();
    }

    //conexion con mongodb
    conexionDB(){ 
        database;
    }



    middlewares(){
        //analiza las solicitudes json entrantes
        // y los coloca en formato req.body
        this.app.use(express.json()); 

        //Permitimos realizar solicitudes al servidor
        this.app.use(cors());

    }

    routes(){
        this.app.use(this._usuariosPath,require('../routes/usuario.router'))
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