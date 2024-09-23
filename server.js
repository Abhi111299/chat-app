const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config({path: "config/.env"});
connectDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});