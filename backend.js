var express = require('express'); //Web server framework
var request = require('request'); //Framework for making API calls
var cors = require('cors'); //Cross origin resource sharing
var querystring = require('querystring'); //Extension for parsing query strings -> the data from URLs
var cookieparser = require('cookie-parser'); //For saving web information
var path = require('path');

var app = express();
var port = 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile('mainpage.html', { root: __dirname });
})

app.get('/about', function(req, res) {
    res.sendFile('aboutpage.html', { root: __dirname });
})

app.get('/cats', function(req, res) {
    res.sendFile('catspage.html', { root: __dirname });
})


app.listen(port, function(){
    console.log('Listening on port ');
})