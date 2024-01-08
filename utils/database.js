const mongoose = require ('mongoose')
//connecting to data base
//const URI ="mongodb://127.0.0.1:27017/yubiApparels_admin"
//mongoose.connect(URI);
const URI = process.env.MONGODB_URI;
//const URI= "mongodb+srv://mohammedtauseef06:Abdul8118@cluster0.d4u806b.mongodb.net/yubiApparels_admin?retryWrites=true&w=majority"
const connectdb = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connected succesfully to db");
    } catch (error) {
        console.error("database connection failed",error.message);
        process.exit(0);
    }
};


module.exports = connectdb;