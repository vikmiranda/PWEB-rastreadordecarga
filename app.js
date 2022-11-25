const express = require('express');
const cors = require('cors');

require('dotenv').config();


const debug = require('debug')('expressProject:server');
const http = require('http');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Conectamos ao MongoDB");
        server.listen(port, () => {
            console.log(`Servidor no port: ${port}`)
        })
    })
    .catch((err) => console.log(err))

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
