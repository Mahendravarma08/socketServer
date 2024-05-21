const mongoose = require("mongoose");

require('dotenv').config()

const dbConnection = mongoose.connect('mongodb://localhost:27017/database1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = dbConnection