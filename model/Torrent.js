
const Drive = require('./Drive');
const fs = require('fs');
var WebTorrent = require('webtorrent')
const { zip } = require('zip-a-folder');

var client = new WebTorrent()

var drive = new Drive();


class Torrent {
    constructor() {
    }

    torrentToDrive(email, magnetURI) {
        client.add(magnetURI, { path: 'TorrentDownload/folder/' }, function (torrent) {
            console.log('torrent downloading started');
            /* torrent.on('infoHash', info => {
              console.log(info);
            }); */
            var total = 0
            torrent.on('download', data => {
                total = total + data;
                console.log(total / (1024 * 1024));
            });
            /* torrent.files.forEach(file => {
              console.log(file);
            }); */

            var FolderName = torrent.name

            torrent.on('done', function () {
                console.log('torrent download finished');

                zip('TorrentDownload/folder/' + FolderName, 'TorrentDownload/zip/' + FolderName + '.zip').then(() => {
                    console.log('ziped');
                    params['location'] = 'TorrentDownload/zip/' + FolderName + '.zip';
                    params['fileName'] = FolderName + '.zip';
                    drive.upload_S2D(email, params);
                });
            })
        })
    }
}

module.exports = Torrent;