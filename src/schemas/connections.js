const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  socketId: { type: String, required: true }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
