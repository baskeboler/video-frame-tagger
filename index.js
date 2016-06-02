/**
 * Created by ramone on 01/06/16.
 */
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var videoHandler = require('./api/video');

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(express.static('app'));
app.use('/api/video', videoHandler);

app.get('/', function (req, res) {
    res.send('Hello!');
});

app.listen('3000', function () {
    console.log('Server started');
});
