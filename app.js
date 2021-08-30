// Require HTTP module (to start server) and Socket.IO
var http = require('http'), io = require('socket.io');

// Start the server at port 8080
var server = http.createServer(function(req, res){ 

	// Send HTML headers and message
	res.writeHead(200,{ 'Content-Type': 'text/html' }); 
	res.end('<h1>Hello Socket Lover!</h1>');
});
server.listen(4001);

// Create a Socket.IO instance, passing it our server
var socket = io(server,{cors: {
  origin: "http://localhost:3000",
  credentials: true}
});

// Add a connect listener
socket.on('connection', function(client){ 
  
	
	// Success!  Now listen to messages to be received
	client.on('message',function(event){ 
		console.log('Received message from client!',event);
	});
	client.on('disconnect',function(){
		// clearInterval(interval);
		console.log('Server has disconnected');
  });
  
  client.on('add',(data)=>{
    client.broadcast.emit('add', data);
  })
  client.on('delete',(data)=>{
	  client.broadcast.emit('delete',data);
  })
  client.on('change',(data)=>{
	  client.broadcast.emit('change',data);
  })

});