'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Publication = require('../models/publication');
var Message = require('../models/message');

function probando(req, res){
    res.status(200).send({
        message: "Hola desde el controlador de messages"
    });
}

function saveMessage(req, res){
    var params = req.body;

    if(!params.text || !params.receiver) return res.status(200).send({message: 'Envia los datos necesarios'});

    var message = new Message();
    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();

    message.save((err, messageStored)=>{
        if(err) return res.status(500).send({message: 'Error en ela peticion'});
        if(!messageStored) return res.status(500).send({message: 'Error al enviar el mensaje'});

        return res.status(200).send({message: messageStored});
    });

}

module.exports = {
    probando,
    saveMessage
}