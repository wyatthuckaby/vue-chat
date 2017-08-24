var express = require('express');
var app = express();
var cors = require('cors');
var server = require('http').createServer(app);
var serverConf = require('./config/serverconfig.js');
var database = require('./config/dbconfig');
//var port = process.env.PORT || 3000;
var io = require('socket.io')(server);



app.use('/', cors({
    origin: 'http://localhost:8080',
    credentials: true
}));


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
		if (user.name && user.room) {
			socket.user = user;
			socket.join(user.room);
			io.to(socket.user.room).emit('join', socket.user);
			console.log(socket.user);
			roomRouter.addRoom(user.room);
		} else console.log ("Someone tried a bad request");
	});

	socket.on('leave', function () {
		if (socket.user.name  && socket.user.room){
			io.to(socket.user.room).emit('left', socket.user);	
		} else console.log('Someone tried to leave badly');
	});

	socket.on('message', function (text) {
		if (text && socket.user.room && socket.user.name) {
			io.to(socket.user.room).emit('message', { user: socket.user.name, message: text });
			console.log(text);
		} else console.log ('Invalid user body');	
	}); 

	// socket.on('disconnect', (reason) => {
	// 	io.to('BCW').emit('left', socket.user);
	// });
});