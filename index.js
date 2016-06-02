/**
 * Created by ramone on 01/06/16.
 */
var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('combined'));

app.use(express.static('app'));
app.get('/', function (req, res) {
    res.send('Hello!');
});

app.listen('3000', function () {
    console.log('Server started');
});
