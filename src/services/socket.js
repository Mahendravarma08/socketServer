// socketService.js
const socketIo = require('socket.io');

module.exports = (httpServer) => {
  const io = socketIo(httpServer,{
    cors:true,origins:'*'
  });
  io.on('connection', (socket) => {
    console.info(`New client connected with client ID ${socket.id}`);
    // console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('message', (message) => {
      console.log(message, "messsageeeee");
      io.emit('ack', message);
    });
  });

  return io; // Optional: return the io instance for further use
};
