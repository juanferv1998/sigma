const mongoose = require('mongoose');
const{Schema} = mongoose;
const contact = new Schema({
    state: String,
    city: String,
    name: String,
    email: String
    

});
module.exports = mongoose.model('contact',contact);