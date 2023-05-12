
const express = require('express');
//const {database} = require('../database/config.db');
const cors = require('cors');
var WebSocketServer = require('websocket').server;
var http = require('http');

class Server {


    constructor(){
        //Creamos una función de controlador de solicitudes
        //Diseñada específicamente para ser un oyente de solicitud http 
        //al que se le pasan los argumentos (req, res)de una solicitud http entrante
        this.app = express();
        //Esteblecemos el puerto a partir de las variables de entorno
        this.port = process.env.PORT;
        //CreateServer recibe la funcion requestlistener el cual se va llamar cada vez que el servidor reciba una solicitud
        //En este caso le enviamos nuestro app de express
        this.server = http.createServer(this.app); //retorna una instancia de http server

        this.wsServer = new WebSocketServer({
            httpServer: this.server,
            // You should not use autoAcceptConnections for production
            // applications, as it defeats all standard cross-origin protection
            // facilities built into the protocol and the browser.  You should
            // *always* verify the connection's origin and decide whether or not
            // to accept it.
            autoAcceptConnections: false
        });

        
        this._usuariosPath = '/api/usuarios'
        
        // this.conexionDB();
        this.middlewares();
        this.routes();

        this.sockets();

    }

    //conexion con mongodb
    conexionDB(){ 
        database;
    }

    sockets(){

        function originIsAllowed(origin) {
            //ponga la lógica aquí para detectar si el origen especificado está permitido.
            return true;
        }

        this.wsServer.on('request', function(request) {
            console.log(request)
            
            if (!originIsAllowed(request.origin)) {
              // Asegúrese de que solo aceptemos solicitudes de un origen permitido
              request.reject();
              console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
              return;
            }
            
            var connection = request.accept(null, request.origin)
            console.log((new Date()) + ' Connection accepted.');
        
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
        
                    let {temp,pir}=   JSON.parse(message.utf8Data)  ;
                    
                    let obj = {
                        temp : temp,
                        pir : pir,
                        fecha : (new Date().toLocaleString())
                    }
        
                    
                    
                    // db.setItem('zen',JSON.stringify(obj));
                    console.log(obj);
        
                   // console.log('Received Message: ' + message.utf8Data);
                    //connection.sendUTF(message.utf8Data); this resend the reseived message, instead of it i will send a custom message. hello from nodejs
                    connection.sendUTF("Saludos desde el Servidor NodeJS");
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    connection.sendBytes(message.binaryData);
                }
            });
        
        
        
            connection.on('close', function(reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });

            
        })

        
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

    //El server va escuchar por el puerto asignado
    listen(){
        this.server.listen(this.port,()=>{
            console.log(`${(new Date())} escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = {
    Server
}