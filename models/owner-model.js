const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    email: String,
    password: String,
    isAdmin: Boolean,
    products: {
        type: Array,
        default: []
    },
    gstin: String,
    picture: String
});


module.exports = mongoose.model('owner', ownerSchema);