var express = require('express');
var fs = require('fs');
const { zip } = require('zip-a-folder');
var Document = require('../model/Document');
var Customer = require('../model/Customer');
var Drive = require('../model/Drive');
var Torrent = require('../model/Torrent');


var router = express.Router();

var customer = new Customer();
var document = new Document();
var drive = new Drive();
var torrent = new Torrent();

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

router.get('/', sessionChecker, function (req, res, next) {
    /* data = customer.userData;
    magnetURI = 'magnet:?xt=urn:btih:84CEC08E68AF9A1BB98657C368152AF17B01F513&dn=Terra+Nova+season+1+complete&tr=http%3A%2F%2Finferno.demonoid.me%3A3414%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce'
    torrent.torrentToDrive('sherlock', magnetURI);
    res.end('true'); */

    var params = {};
    params['location'] = 'views';
    params['fileName'] = 'views';
    params['mimeType'] = 'application/vnd.google-apps.folder';
    drive.upload_S2D('sherlock', params);
});


module.exports = router;