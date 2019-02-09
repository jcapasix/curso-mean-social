'use strict'
var bcrypt = require('bcrypt-nodejs')
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

//metodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

function pruebas(req, res){
	res.status(200).send({
		message: 'Acción de pruebas desde el servidor de NodeJS'
	});
}

//registro
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if (params.name && params.surname && params.nick && params.email && params.password){

		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		//controlar usuarios duplicados
		User.find({
			$or:[
				{email: user.email.toLowerCase()},
				{nick: user.nick.toLowerCase()}
			]}).exec((err, users) =>{

				if (err) return res.status(500).send({message: 'Errpr en la peticion de usuarios'})

				if(users && users.length >= 1){
					return res.status(200).send({message: 'El usuario que intentas registrar ya existe'})
				}
				else{
					//cifra las contrase;a y guarda los datos
					bcrypt.hash(params.password, null, null, (err, hash) => {
						user.password = hash;
						user.save((err, userStored) => {
							if(err) return res.status(500).send({message: 'Error al guardar el usuario'})
							
							if(userStored){
								res.status(200).send({user:userStored});
							}
							else{
								res.status(400).send({message:"No se ha registrado el usuario"});
							}
						});
					});
				}
			});
	}
	else{
		res.status(200).send({message:"Envia todos los campos necesarios"});
	}

}

//login
function loginUser(req, res){
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email:email}, (err, user) =>{
		if(err) return res.status(500).send({message: 'Error en la peticion'})

		if(user){
			bcrypt.compare(password, user.password, (err, check) => {
				if(check){

					if(params.gettoken){
						//generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(user)
						});
					}
					else{
						//devolvemos datos del usuario
						user.password = undefined
						return res.status(200).send({user})
					}
				}
				else{
					return res.status(404).send({message: 'El usuario no se ha podido identificar'})
				}
			});
		}
		else{
			return res.status(404).send({message: 'El usuario no se ha podido identificar!!!'})
		}
	});
}


//conseguir datos de un usuario

function getUser(req, res){

	var userId = req.params.id;
	User.findById(userId, (err, user)=> {
		if(err) return res.status(500).send({message: 'Error en ela peticion'});
		if(!user) return res.status(404).send({message: 'El usuario no existe'});

		return res.status(200).send({user});
	});
}

function getUsers(req, res){

	var identity_user_id = req.user.sub;
	var page = 1;

	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 5;

	User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) =>{
		if(err) return res.status(500).send({message: 'Error en ela peticion'});
		if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

		return res.status(200).send({
			users, 
			total,
			pages: Math.ceil(total/itemsPerPage)
		});

	});
}

function updateUser(req, res){

	var userId = req.params.id;
	var update = req.body;

	console.log(update)

	//borrar propiedad password
	delete update.password;

	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
	}

	User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
		if(err) return res.status(500).send({message: 'Error en ela peticion'});
		if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

		return res.status(200).send({ user: userUpdated});
	});
}

function uploadImage(req, res){
	var userId = req.params.id;

	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
	}
	
	if(req.files){
		var file_path = req.files.image.path;
		console.log(file_path);
		var file_split = file_path.split('\/');
		console.log(file_split);
		var file_name = file_split[2];
		console.log(file_name);


		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];

		if(userId != req.user.sub){
			return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
		}

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg'){
			//Actualizar documento de usuario logueado
			User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated) => {
				if(err) return res.status(500).send({message: 'Error en ela peticion'});
				if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				return res.status(200).send({ user: userUpdated});
			});
		}
		else{
			return removeFilesOfUploads(res, file_path, 'Extension no valida');
		}

	}
	else{
		return res.status(200).send({ message: 'No se han subido imagenes'});
	}
}

function removeFilesOfUploads(res, file_path, message){
	fs.unlink(file_path, (err)=>{
		return res.status(200).send({ message: message});
	})
}

function getImageFile(req, res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/users/'+image_file;

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}
		else{
			res.status(200).send({message: 'No existe la imagen ...'});
		}
	});
}

module.exports = {
	home,
	pruebas,
	saveUser,
	loginUser,
	getUser,
	getUsers,
	updateUser,
	uploadImage,
	getImageFile
}
