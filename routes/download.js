var express = require('express');
var fs = require('fs');
var Document = require('../model/Document');
var Customer = require('../model/Customer');
var Drive = require('../model/Drive');


var router = express.Router();

var customer = new Customer();
var document = new Document();
var drive = new Drive();

var sessionChecker = (req, res, next) => {
    var customer = new Customer();
    if (typeof req.session.db == 'undefined') {
        //document.getDB();
        req.session.db = true;
      }
    if (!(req.session.user && req.cookies.user_sid)) {
        next();
    } else {
        customer.logBySession(req.session.userName).then(() => {
            next();
        });
    }
};

router.get('/:id', sessionChecker, function (req, res, next) {
    data = customer.userData;
    id = req.params.id;
    drive.download(id,res);
});


module.exports = router;