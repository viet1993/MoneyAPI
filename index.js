var server = require("./server");
var router = require("./route");

server.startServer(router.route);

