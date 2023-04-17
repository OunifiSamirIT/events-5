const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mp3Schema = new Schema({
    title: String,
    description: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    mp3: String

}, {timestamps: true})




module.exports = mongoose.model('Playlist', Mp3Schema)

