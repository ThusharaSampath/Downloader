var express = require('express');
var fs = require('fs');
var Document = require('../model/Document');
var Customer = require('../model/Customer');
var Drive = require('../model/Drive');


var router = express.Router();

var customer = new Customer();
var document = new Document();
var drive = new Drive();

router.get('/:id', function (req, res, next) {
    id = req.params.id;
    drive.download(id,res);
});


module.exports = router;