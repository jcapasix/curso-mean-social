'use strict'

// var path = require('path');
// var fs = require('fs')
var mongoosePaginate = require('mongoose-pagination');

var Follow = require('../models/follow');

function prueba(req, res){
    res.status(200).send({message: 'Hola Mundo desde el controlador follows'})
}

module.exports = {
    prueba
}