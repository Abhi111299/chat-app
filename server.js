const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/UserModel');

dotenv.config({path: "config/.env"});
connectDB();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIo(server);

var usp = io.of('/user-namespace');

usp.on('connection',async function (socket) {
    console.log("User connected");
    var user_id = socket.handshake.auth.token;
    await User.findByIdAndUpdate({_id: user_id}, {$set:{ is_online: '1'}});

    socket.on('disconnect',async function () {
        console.log("User disconnected");
        var user_id = socket.handshake.auth.token;
        await User.findByIdAndUpdate({_id: user_id}, {$set:{ is_online: '0'}});
    });
});

server.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});