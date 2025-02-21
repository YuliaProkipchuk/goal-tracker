require('dotenv').config()
const mongoose = require('mongoose')
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('db connected')
    } catch (error) {
        console.error('Error connecting to db: ', error);
        process.exit(1)
    }
}

module.exports = connectDB;