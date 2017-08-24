var express = require('express');
var app = express();
var server = require('http').createServer(app);
var serverConf = require('./config/serverconfig.js');
var database = require('./config/dbconfig');
//var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client'));


var roomRouter = require ('./routes/room-route')
app.use ('/rooms', roomRouter.router);

server.listen(3000, function() {
    //Success
    console.log(`Unix Socket - [ OK ]`);
}).on('error', function(err) {
    //fail
    console.log(err);
    console.log(`Unix Socket - [FAIL]`);
});

io.on('connection', function (socket) {

	// socket.join( function () {
		
	// });

	socket.on('join', function (user) {
		console.log(user);
		if (user.name) {
			socket.user = user;
			socket.join(user.room);
			io.to(socket.user.room).emit('join', socket.user);
			console.log(socket.user);
			roomRouter.addRoom(user.room);
		}	
	});

	socket.on('leave', function () {
		io.to(socket.user.room).emit('left', socket.user);	
	});

	socket.on('message', function (text) {
		if (text) {
			io.to(socket.user.room).emit('message', { user: socket.user.name, message: text });
			console.log(text);
		}	
	});

	socket.on('disconnect', (reason) => {
		io.to('BCW').emit('left', socket.user);
	});

});