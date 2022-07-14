const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tanentAds = new Schema({
    title: String,    
    description: String,
    region: String,
    city: String,
    state: String,
    zip: Number,
    rent: Number,
    deposit: Number,
    date: Date,
    houseType: String,
    room: Number,
    bed: Number,
    bath: Number,
    minStay: String,
    maxStay: String,
    utilities: [Object],
    amenities: [Object],
    img_collection: [Object],
}, { timestamps: false });

module.exports = mongoose.model('TanentAds', tanentAds)
