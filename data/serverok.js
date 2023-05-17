
// const express = require('express');
// //const {database} = require('../database/config.db');
// const cors = require('cors');
// var WebSocketServer = require('websocket').server;
// var http = require('http');
// const { isKeyObject } = require('util/types');

// class Server {


//     constructor(){
//         //Creamos una función de controlador de solicitudes
//         //Diseñada específicamente para ser un oyente de solicitud http 
//         //al que se le pasan los argumentos (req, res)de una solicitud http entrante
//         this.app = express();
//         //Esteblecemos el puerto a partir de las variables de entorno
//         this.port = process.env.PORT;
//         //CreateServer recibe la funcion requestlistener el cual se va llamar cada vez que el servidor reciba una solicitud
//         //En este caso le enviamos nuestro app de express
//         this.server = http.createServer(this.app); //retorna una instancia de http server

//         this.wsServer = new WebSocketServer({
//             httpServer: this.server,
//             // You should not use autoAcceptConnections for production
//             // applications, as it defeats all standard cross-origin protection
//             // facilities built into the protocol and the browser.  You should
//             // *always* verify the connection's origin and decide whether or not
//             // to accept it.
//             autoAcceptConnections: false
//         });

        
        
//         this._usuariosPath = '/api/usuarios'
        
//         // this.conexionDB();
//         this.middlewares();
//         this.routes();

//         this.sockets();

//     }

//     //conexion con mongodb
//     conexionDB(){ 
//         database;
//     }

//     sockets(){

//         let conexiones = [];

//         function originIsAllowed(origin) {
//             //ponga la lógica aquí para detectar si el origen especificado está permitido.
//             return true;
//         }

//         this.wsServer.on('request', function(request) {
//            // console.log(request)

//             if (!originIsAllowed(request.origin)) {
//               // Asegúrese de que solo aceptemos solicitudes de un origen permitido
//               request.reject();
//               console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//               return;
//             }
            
//             var connection = request.accept(null, request.origin)
//             console.log((new Date()) + ' Connection accepted.');
//             conexiones.push(connection);
//             console.log(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);
        

//             //Manejar mensajes entrantes
            
//             connection.on('message', function(message) {

//                 if (message.type === 'utf8') {
                    
                    
//                     try {

//                         let {ldr,pir,temp_c,temp_f,hume,s_ter,}=   JSON.parse(message.utf8Data)  ;
                    
//                         let obj = {
//                             LDR : ldr,
//                             TempC : temp_c,
//                             TempF : temp_f,
//                             Humedad : hume,
//                             Sensacion_Termica : s_ter,
//                             Pir : pir,
//                             Fecha : (new Date().toLocaleString())
//                         }
//                         console.log(obj);
//                         //connection.sendUTF("Saludos desde el Servidor NodeJS");

//                         conexiones.forEach( con => {
//                             con.send(message.utf8Data)
//                         });
//                         //console.log("Mensaje desde Node " + message.utf8Data);
//                    } catch (error) { 

                        
//                     }finally{
//                         // if (message.type === 'utf8') {
//                         //     console.log("Mensaje recibido finally: " + message.utf8Data);
//                         //     connection.send("Recibido finally: " + message.utf8Data);
                            
                            
//                         // }
//                         // else if (message.type === 'binary') {
//                         //     console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//                         //     //connection.sendBytes(message.binaryData);
//                         // }
//                         //Enviar la data a todos
//                         // conexiones.forEach( con => {
//                         //     con.send(message.utf8Data)
//                         // });
//                         console.log("Mensaje desde Node " + message.utf8Data);
//                     }

                    
//                 }
                

                
//             });
        
        
        
//             connection.on('close', function(reasonCode, description) {
//                 console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//                 var index = conexiones.indexOf(connection);
//                 if (index !== -1) {
//                     // remove the connection from the pool
//                     conexiones.splice(index, 1);
//                 }
//             });

            
//         })

        
//     }

    

//     middlewares(){
//         //analiza las solicitudes json entrantes
//         // y los coloca en formato req.body
//         this.app.use(express.json()); 

//         //Permitimos realizar solicitudes al servidor
//         this.app.use(cors());

//         // Directorio Público
//         this.app.use( express.static('public') );

//     }

//     routes(){
//         this.app.use(this._usuariosPath,require('../routes/usuario.router'))
//     }

//     //El server va escuchar por el puerto asignado
//     listen(){
//         this.server.listen(this.port,()=>{
//             console.log(`${(new Date())} escuchando en el puerto ${this.port}`);
//         })
//     }
// }

// module.exports = {
//     Server
// }