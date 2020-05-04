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

    if (!(req.session.user && req.cookies.user_sid)) {
        if (req.params.token == 'admin') {
            next();
        }
    } else {
        customer.logBySession(req.session.userName).then(() => {
            next();
        });
    }
};

router.get('/filter/:token', sessionChecker, async function (req, res, next) {

    await document.getVideos().then(async data => {

        var result = []

        Object.keys(data).forEach(id => {
            var video = data[id];
            result.push(video);
        });

        result = result.filter(film => {
            return !film.approved;
        });

        result.sort(function (a, b) {
            return a.name.localeCompare(b.name);;
        });

        result.sort(function (a, b) {
            return Date.parse(b.modifiedTime) - Date.parse(a.modifiedTime)
        });
        console.log(result.length);
        R = {
            films: result.slice(0, 20),
        }
        res.end(JSON.stringify(R));
    });
});


module.exports = router;