


var mongoose = require("mongoose");
var connection = mongoose.connection;

var status = `Connecting to database - `;

var password = "KSYsrXBA39a7kN0JIFN0QQTvu4TAVJCranFWiK8WmIonspU47J";
var username = "chatpublic";

// /mongodb://<dbuser>:<dbpassword>@ds151963.mlab.com:51963/vue-chat
mongoose.connect(`mongodb://${username}:${password}@ds151963.mlab.com:51963/vue-chat`, {

    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', (err) => {
    status += `[FAIL]`;
    console.log(status);
});


connection.once('open', (err) => {
    status += `[ OK ]`;
    console.log(status);
})