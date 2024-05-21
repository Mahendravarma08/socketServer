const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})


const User = mongoose.model('user',signUpSchema)
module.exports = User