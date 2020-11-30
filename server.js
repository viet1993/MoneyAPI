const http = require('http');
var https = require('https');
var url = require("url");
const xml2js = require('xml2js');
const port = 3001;
var fs = require('fs');
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

function readXMLCurrency () {
  var data = '';
  var serializer = new (require('xmldom')).XMLSerializer;
  var implementation = new (require('xmldom')).DOMImplementation;
  https.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=1', function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        console.log('data', data);
        var parser = new xml2js.Parser();

        xml2js.parseStringPromise(data, { mergeAttrs: true })
        .then(result => {
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4);

            // save JSON in a file
            fs.writeFileSync('data/dataCurrent.json', json);

        }).catch(err => console.log(err));

        parser.parseString(data, function(err, result) {
        // print data to xml
        var document = implementation.createDocument('', '', null);
        document.appendChild(document.createElement(data));
          fs.writeFile(
            "data/data.xml", 
            serializer.serializeToString(document), 
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("The file was saved!");
              }
            }
          ); 
        });
      });
    }
  });
}

function readXMLGold () {
   var data = '';
   https.get('https://tygia.com/json.php?ran=0&rate=0&gold=1&bank=VIETCOM&date=now', function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        // console.log('data', data);
        // save JSON in a file
        fs.writeFileSync('data/dataGold.json', data);
      });
    }
  });
}

exports.startServer = startServer
exports.readXMLCurrency = readXMLCurrency
exports.readXMLGold = readXMLGold