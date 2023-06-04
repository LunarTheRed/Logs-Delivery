const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: String,
    idOwner: String,
    premium: {type: Boolean, default: false},
    toggle: {type: Boolean, default: false},
    user: {type: String, default:"329403269153816576,739990204559130714"}
    //Name: String,
    //Number: Number,
    //VIP: Boolean
    //AutoRole: { Autorole1: String, Autorole2: String },
    //Badge: {vip: {type: Boolean, default: false}},
});

module.exports = mongoose.model('Guild', Schema);