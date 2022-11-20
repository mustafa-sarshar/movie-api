"use strict";

const http = require("http"),
    url = require("url"),
    fs = require("fs"),
    portNumber = 8080;

http.createServer((request, response) => {
    let addr = request.url,
        addrParsed = url.parse(addr, true),
        filePath = "";
    console.log("Dir:", __dirname);
    if (addrParsed.pathname.includes("documentation")) {
        filePath = __dirname + "/documentation.html";
    } else {
        filePath = "index.html";
    }

    fs.appendFile(
        "log.txt",
        "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Added to log.");
            }
        }
    );

    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    });
}).listen(portNumber);

console.log(`My test server is running on Port ${portNumber}.`);
