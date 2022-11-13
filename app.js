require('dotenv').config();
const express = require('express');
const cors = require('cors');

const debug = require('debug')('expressProject:server');
const http = require('http');
const mongoose = require('mongoose');
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

const app = express();

app.use(cors());
app.use(express.json());

// routes
const cargaRouter = require('./routes/carga');
app.use('/carga', cargaRouter);

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bf6kvlp.mongodb.net/?retryWrites=true&w=majority`)
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