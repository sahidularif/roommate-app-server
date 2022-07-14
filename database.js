// MongoDB Configuration
const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://localhost/roommate', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to Mongodb database'))
    .catch(error => console.log('Database could not be connected'))
}

