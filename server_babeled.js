"use strict";

var http = require("http"),
    url = require("url"),
    fs = require("fs"),
    portNumber = 8080;

http.createServer(function (request, response) {
    var addr = request.url,
        addrParsed = url.parse(addr, true),
        filePath = "";
    console.log("Dir:", __dirname);
    if (addrParsed.pathname.includes("documentation")) {
        filePath = __dirname + "/documentation.html";
    } else {
        filePath = "index.html";
    }

    fs.appendFile("log.txt", "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n", function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Added to log.");
        }
    });

    fs.readFile(filePath, function (err, data) {
        if (err) {
            throw err;
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}).listen(portNumber);

console.log("My test server is running on Port " + portNumber + ".");