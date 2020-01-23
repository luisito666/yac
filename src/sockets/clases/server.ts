import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
// Import From Local Project
import * as socket from '../sockets/sockets'
import { SERVER_PORT } from '../enviroments/environments';


export default class Server {
    private static _instance: Server;
    private httpServer: http.Server;
    public app: express.Application;
    public port: number;
    public io: SocketIO.Server;

    private constructor() {
        this.app = express()
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = SocketIO( this.httpServer );

        // Listen Sockets
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }

    private listenSockets() {
        console.log('Start to listen sockets..')
        this.io.on('connect', client => {
            // Register functions
            socket.connectUser(client, this.io);

            socket.configUser(client, this.io);

            socket.getUsers(client, this.io);

            socket.message(client, this.io);

            socket.disconnectUser(client, this.io);

        });
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );
    }


}

