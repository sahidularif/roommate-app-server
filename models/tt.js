

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addRoom = new Schema([
    {
        $group: {
            _id: "$person.email",
            traveled_to: {
                $push: {
                    traveled_to: "$person.traveled_to",
                    someinfo: "$person.someinfo"
                }
            },
        },
    },
]);

module.exports = mongoose.model('TT', addRoom)