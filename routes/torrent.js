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
    data = customer.userData;
    magnetURI = 'magnet:?xt=urn:btih:EE905DF8B341662E9D14BD84F80071F46394E5D7&dn=The+Blacklist+S07E17+HDTV+x264-SVA+%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce';
    torrent.torrentToDrive('sherlock',magnetURI);
    
    res.end('true');
});



module.exports = router;