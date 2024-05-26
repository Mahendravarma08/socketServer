// socketService.js
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const User = require('../schemas/signup')
const Connection = require('../schemas/connections');
const Message = require('../schemas/messages')

module.exports = (httpServer) => {
  const io = socketIo(httpServer,{
    cors:true,origins:'*'
  });
  io.on('connection', async (socket) => {
    console.info(`New client connected with client ID ${socket.id}`);
    const username = socket.handshake.query.username;
    console.log(username,"userrrrrrrrrrrrrrrrrrr");
    // const newConnection = new Connection({
    //   userName:username,
    //   socketId:socket.id
    // })

    // await newConnection.save()

    // const updateStatus = await User.updateOne(
    //   {userName:username},
    //   {$set:{status:1}},
    // )

    const result = await Connection.updateOne(    
      { userName: username }, // Filter by username
      { $set: { socketId: socket.id } }, // Update the socketId
      {upsert:true}
    ); 

    socket.on('disconnect', async () => {
      console.log('Client disconnected');
      try {
        await Connection.deleteOne({ socketId: socket.id });
        console.log('Connection removed');
      } catch (error) {
        console.error('Error removing connection:', error);
      }
    });

    socket.on('send-message', async (message) => {
      console.log(message, "messsageeeee");
      const newMessage = new Message(message);
      try{
        await newMessage.save();

        const recipientSocketID = await Connection.findOne({
          userName:message.recipient
        }).select('socketId')

        console.log(recipientSocketID,"ev evb ebv ");
        // console.log(`Message saved from ${sender} to ${recipient}`);
        if(recipientSocketID?.socketId)
          io.to(recipientSocketID.socketId).emit('receive-message', newMessage);
      }
      catch(err){
        console.log(err,"error at sending message");
        socket.emit('message-error', 'Failed to send message');
      }
      io.emit('ack', message);
    });
  });

  return io; // Optional: return the io instance for further use
};
