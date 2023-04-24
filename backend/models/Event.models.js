const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    Nom: String,
    Date: String,
    Artistes  :  String,
    Lien: String,
    image:  String, 
    favorit: {
        type: Boolean,
        default: false
      },
    
   
}, {timestamps: true})




module.exports = mongoose.model('event', EventSchema)
