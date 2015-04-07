var http = require("http")
var ws = require("nodejs-websocket")
var fs = require("fs")

http.createServer(function (req, res) {
	fs.createReadStream("index.html").pipe(res)
}).listen(8080);

var server = ws.createServer(function (connection) {
    console.log("Client connected");
	connection.on("text", function (str) {
        console.log("Message: ", str);
        //store
        
        //broadcast
        broadcast(str);
	})
})
server.listen(8081);

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str);
	})
}
