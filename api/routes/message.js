'use strict'

var express = require('express');
var MessageController = require('../controllers/message');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir: './uploads/publications'})

api.get('/probando-md', md_auth.ensureAuth, MessageController.probando);
api.post('/message', md_auth.ensureAuth, MessageController.saveMessage);
api.get('/my-message/:page?', md_auth.ensureAuth, MessageController.getReceivedMessage);
api.get('/message/:page?', md_auth.ensureAuth, MessageController.getEmmitMessage);


module.exports = api;