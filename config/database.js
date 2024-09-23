const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log("Mongodb connected succesfully");
    })
}

module.exports = connectDb;