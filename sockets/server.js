const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))


io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      console.log('message: ' + msg);
    });
    socket.on('type', (user)=>{
        console.log(user)
        if (user.typing==true)
        {
            socket.broadcast.emit('type','Esta escribiendo'+' '+user.user);  
        }
        else{
            socket.broadcast.emit('type','');   
        }
      })
  });
  
 
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
