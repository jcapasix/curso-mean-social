'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Publication = require('../models/publication');

function probando(req, res){
    res.status(200).send({
        message: "Hola desde el controlador de publicaciones"
    });
}

module.exports = {
    probando
}