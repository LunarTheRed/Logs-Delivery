const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: String,
    //Name: String,
    //Number: Number,
    //VIP: Boolean
    //AutoRole: { Autorole1: String, Autorole2: String },
    //Badge: {vip: {type: Boolean, default: false}},
    //Transcripts: {type: Array, default: []},
    //Bypass: {type:String, default:"lunar,loona,lame,alexis"},
});

module.exports = mongoose.model('Name', Schema);