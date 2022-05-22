const https = require('https');
const request = require('request');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

var totalAddresses = "";
const fs = require('fs');
fs.readFile('./wallets.txt','utf8',(err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    totalAddresses = data;
});

app.use(function (re, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

app.use(express.json());

app.get('/', function (request, res) {
    res.send("Hello world!");
});

app.get('/wallets', (req, res) => {
    res.send(totalAddresses);
});
app.get('/balance.php', (req, res) => {


    var originUrl = req.originalUrl;
    var address = originUrl.replace("/balance.php?add=0", 0);
    if(!totalAddresses.includes(address)){
        address += "<br/>\n";
        fs.appendFile('./wallets.txt', address, err => {
            if (err) {
                console.error(err);
            }
            totalAddresses += address;
        });
    }
    request(
        { url: 'https://minidog.io/' + originUrl },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }

            res.json(JSON.parse(body));
        }
    )
});
app.get('/connect.php', (req, res) => {
    var originUrl = req.originalUrl;
    try {
        request(
            { url: 'https://minidog.io/' + originUrl },
            (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    return res.status(500).json({ type: 'error', message: err.message });
                }

                res.send(body);
            }
        )
    } catch (error) {
        console.log("get error==========", error);
    }

});
app.listen(port, '0.0.0.0');