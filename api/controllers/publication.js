'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Publication = require('../models/publication');

function probando(req, res){
    res.status(200).send({
        message: "Hola desde el controlador de publicaciones"
    });
}

function savePublication(req, res){
    var params = req.body;

    if(!params.text) return res.status(200).send({message: 'Debes enviar un texto'});

    var publication = new Publication();
    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar la publicacion'});
        if(!publicationStored) return res.status(404).send({message: 'La publicacion No ha sido guardada'});

        return res.status(200).send({publication: publicationStored});
    });
}

function getPublications(req, res){
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 4;

    Follow.find({user: req.user.sub}).populate('followed').exec((err, follows)=>{
        if(err) return res.status(500).send({message: 'Error devolver el seguimiento'});

        var follows_clean = [];

        follows.forEach((follow)=>{
            follows_clean.push(follow.followed);
        })

        console.log(follows_clean)

        Publication.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total)=>{

            if(err) return res.status(500).send({message: 'Ho hay publicaciones'});
            if(!publications) return res.status(404).send({message: 'Ho hay publicaciones'});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                publications
            });
        });
    })
}

function getPublication(req, res){
    var publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) =>{
        if(err) return res.status(500).send({message: 'Error devolver publicacion'});
        if(!publication) return res.status(404).send({message: 'No existe la publicacion'});
        return res.status(200).send({publication});
    });
}

function deletePublication(req, res){
    var publicacionId = req.params.id;

    Publication.find({user: req.user.sub, '_id':publicacionId}).remove(err =>{
        if(err) return res.status(500).send({message: 'Error al borrar publicacion'});
        //if(!publication) return res.status(404).send({message: 'No se ha borrada la publicacion'});
        return res.status(200).send({message: 'Publicacion eliminada correctamente'});
    });
}

module.exports = {
    probando,
    savePublication,
    getPublications,
    getPublication,
    deletePublication
}