const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io'); 

dotenv.config({path: "config/.env"});
connectDB();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIo(server);

var usp = io.of('/user-namespace');

usp.on('connection', function (socket) {
    console.log("User connected");

    socket.on('disconnect', function () {
        console.log("User disconnected");
    });
});

server.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});