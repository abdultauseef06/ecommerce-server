const mongoose = require('mongoose');

const URI = 'mongodb+srv://mohammedtauseef06:Abdul8118@cluster0.d4u806b.mongodb.net/yubiApparels_admin?retryWrites=true&w=majority';

const connectdb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected successfully to the database");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit with non-zero code to indicate an error
    }
};

module.exports = connectdb;
