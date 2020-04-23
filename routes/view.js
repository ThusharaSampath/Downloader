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
    if (!(req.session.user && req.cookies.user_sid)) {
        next();
    } else {
        customer.logBySession(req.session.userName).then(() => {
            next();
        });
    }
};

router.post('/', sessionChecker, function (req, res, next) {
    data = customer.userData;
    document.updateDB_views(req.body.id);
    res.end('true');
});

module.exports = router;