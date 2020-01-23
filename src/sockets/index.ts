import Server from './clases/server';
import router from './routes/router';
// Thirt party APPS
import bodyParser from 'body-parser';
import cors from 'cors';

// Server Instance.
const server = Server.instance;

// Config Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors Config
server.app.use(cors({origin: true, credentials: true}));

// Rutas
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor Corriendo en el puerto ${server.port}`);
});

