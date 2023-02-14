const {mongoose, connection} = require('mongoose');
const {MONGODB_URL} = require('./config');

const connectDB = async () => {
    await mongoose.connect(MONGODB_URL);
    // console.log('MongoDB Connected');
}

connection.on('error', err => console.log(err))

module.exports = {
    connectDB,
    connection
}