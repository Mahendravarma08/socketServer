const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    // status : {type:Number,required:true}
    // socketId: { type: String,default:null }
})


const User = mongoose.model('user',signUpSchema)
module.exports = User