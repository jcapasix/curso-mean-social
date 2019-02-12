'use strict'

// var path = require('path');
// var fs = require('fs')
var mongoosePaginate = require('mongoose-pagination');

var Follow = require('../models/follow');

function prueba(req, res){
    res.status(200).send({message: 'Hola Mundo desde el controlador follows'})
}

function saveFollow(req, res){
    var params = req.body;

    var follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el seguimeinto'});
        if(!followStored) return res.status(404).send({message: 'El seguimiento no se ha guardado'});
        return res.status(200).send({follow: followStored});
    });
}

module.exports = {
    prueba,
    saveFollow
}