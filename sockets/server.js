const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
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
  
 
  
  server.listen(server_port,server_host, () => {
    console.log('listening onn *:'+server_port);
  });
