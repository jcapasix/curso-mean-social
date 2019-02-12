'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_router = require('./routes/user');
var follow_router = require('./routes/follow');
var publication_router = require('./routes/publication');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors

//rutas
app.use('/api', user_router);
app.use('/api', follow_router);
app.use('/api', publication_router);

//exportar
module.exports = app;







