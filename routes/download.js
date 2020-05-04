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
    customer = new Customer();
    if (!(req.session.user && req.cookies.user_sid)) {
      //not logged in
      next();
    } else {
      customer.logBySession(req.session.userName).then(() => {
        next();
      });
    }
  };

router.get('/:id',sessionChecker, function (req, res, next) {
    id = req.params.id;
    drive.download(id, res);
});

router.get('/watch/:id',sessionChecker, function (req, res, next) {
    id = req.params.id;
    drive.download(id, res, true);
});

router.get('/drive/:id',sessionChecker, function (req, res, next) {

    var host = req.headers.host;

    data = customer.userData;
    var url = "http://"+host+"/download/" + req.params.id;
    var isVideo = false;
    drive.upload(data.token, {
        url: url,
        email: customer.userData.email,
        isVideo: isVideo
    });
    res.json({
        name: getName(url),
        email: customer.userData.email
    });
});


function getName(url, isVideo = false, header = '') {
    var url = url.split('?')[0];

    var arr = url.split('/');
    name_ = arr[arr.length - 1];

    arr = name_.split('\\');
    name = arr[arr.length - 1];

    if (isVideo == 'true') {
        name = name + '.mp4'
    }
    HEADER = []
    try {
        HEADER = header.split(';');
    } catch{ }

    HEADER.forEach(element => {

        try {
            e = element.trim().split('=');
            if (e[0] == 'filename') {
                name = e[1]
            }
        } catch{ }

    });



    console.log('inside getName', isVideo, " : ", name);
    return name
}

module.exports = router;