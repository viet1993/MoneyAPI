const http = require('http');
var url = require("url");
const port = 3001;
//const server = http.createServer();

function startServer () {
   function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started port " + port);
}

function readXML () {
  fs = require('fs');
  var parser = require('xml2json');

  fs.readFile( './data.xml', function(err, data) {
      var json = parser.toJson(data);
      console.log("to json ->", json);
  });
}

exports.startServer = startServer
exports.readXML = readXML
