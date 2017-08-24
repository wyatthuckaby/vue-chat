var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var roomSchema = new mongoose.Schema({
	title: {type: String, required: true},
	//userCount: {type: Number, required: true}
	created: {type: Date, default: new Date()}
});

module.exports = mongoose.model("Room", roomSchema);