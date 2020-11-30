var server = require("./server");
var router = require("./api/route");

server.startServer(router.route);
setTimeout(function(){server.readXML(), server.readXMLGold()} , 120000)