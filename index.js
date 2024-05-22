// index.js
const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const socketService = require('./src/services/socket'); // Adjust path if needed
const routes = require('./routes')
const cors = require('cors')
const app = express();
const server = http.createServer(app);
socketService(server); // This might return the io instance if needed
const mongoose = require('mongoose')

require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())
app.use(routes)
mongoose.connect(process.env.DB).then(()=>{
  console.log("DB connection Successful...");
  server.listen(process.env.port, () => {
    console.log(`Listening on port ${process.env.port}`);
  });
}).catch((err)=>{
  console.error(err)
})

