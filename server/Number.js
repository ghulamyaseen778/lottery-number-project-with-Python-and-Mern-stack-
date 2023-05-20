const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    num:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

const BoneSchema = mongoose.model('paperNumber',Schema)
module.exports = BoneSchema