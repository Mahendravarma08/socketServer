const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    members:{type:Array,required:true},
    groupTitle:{type:String,required:true},
    groupPhoto:{type:String,default:null},
    admin:{type:Array,required:true}
})


const group = mongoose.model('group',groupSchema)
module.exports = group