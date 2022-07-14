// MongoDB Configuration
require('dotenv').config();
const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.or4h7.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to Mongodb database'))
    .catch(error => console.log('Database could not be connected'))
}

