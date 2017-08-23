var express = require('express');
var sanitizeHtml = require('sanitize-html');
var router = express.Router();


var Rooms = require('../models/room');


router.get ("/", (req,res,next) =>{
	Rooms.find({}).then((results)=>{
		res.send(results);
	});
});

module.exports.addRoom = function(str){
	Rooms.find({}).then((results) =>{
		for (result in results){
			if (str == results[result])
				return;
		}

	})
	Rooms.create({title: str});
}

module.exports.router = router;
