const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    recipient: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    groupId : {type:String}
  });
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;