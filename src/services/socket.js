// socketService.js
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const User = require('../schemas/signup')
const Connection = require('../schemas/connections');
const Message = require('../schemas/messages')
const Group = require('../schemas/group');
const group = require('../schemas/group');

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

    await Connection.updateOne(    
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


    socket.on('sendGroupMessage', async (message, roomId) => {
      console.log(message,roomId,"messageandroomId");
      // Send message to all users in the room
      const groupMessage = new Message(message)
      io.to(roomId).emit('messageReceived', { message, sender: socket.id });
      await groupMessage.save()
    });


    socket.on('joinGroup', async (currentUser) => {
      console.log(currentUser,"efgwsrgrwgw");
      const groupIds = await Group.find({
        members:currentUser
      })

      console.log(groupIds,"efgwefgwewe")

      for (const ele of groupIds) {
        socket.join(String(ele._id));
        console.log(`User joined room ${String(ele._id)}`);
      }
    });
  });

  return io;
};
