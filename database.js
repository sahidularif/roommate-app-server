// MongoDB Configuration
require('dotenv').config();
const mongoose = require('mongoose');
const DBLOCAL = `mongodb://localhost:27017/renterbd`
const DB = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.or4h7.mongodb.net/renterbd?retryWrites=true&w=majority`
module.exports = () => {
    mongoose.connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(() => console.log('Connected to Mongodb database'))
    .catch(error => console.log('Database could not be connected'))
}

