const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

var chat = require('../chat/chat');
const Axios = require('axios');
var streamBuffers = require('stream-buffers');

//Drive API, v3
//https://www.googleapis.com/auth/drive	See, edit, create, and delete all of your Google Drive files
//https://www.googleapis.com/auth/drive.file View and manage Google Drive files and folders that you have opened or created with this app
//https://www.googleapis.com/auth/drive.metadata.readonly View metadata for files in your Google Drive
//https://www.googleapis.com/auth/drive.photos.readonly View the photos, videos and albums in your Google Photos
//https://www.googleapis.com/auth/drive.readonly See and download all your Google Drive files
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

var db = require('../model/db');



class Drive {
    constructor() {
    }

    getURL() {

        var data = fs.readFileSync('config/credentials.json');
        var credentials = JSON.parse(data);
        //console.log(credentials);

        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        return authUrl;
    }

    setToken(code, customer) {
        var data = fs.readFileSync('config/credentials.json');
        var credentials = JSON.parse(data);

        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);


        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            db.update('customer', customer.userData.email, {
                token: token
            });
        });

    }

    async getFiles(email) {
        var result = []
        await db.getToken(email).then(async token => {
            var content = fs.readFileSync('config/credentials.json');
            if (typeof token == 'undefined') {
                return [];
            }

            const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.

            oAuth2Client.setCredentials(token);
            try {
                await listFiles(oAuth2Client, email).then(data => {
                    result = data
                });
            } catch{
                result = []

            }


        });
        return result;
    }

    async saveDB(email, data) {
        var result = []
        await db.getToken(email).then(async token => {
            var content = fs.readFileSync('config/credentials.json');
            if (typeof token == 'undefined') {
                return [];
            }

            const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.

            oAuth2Client.setCredentials(token);
            await saveDB(oAuth2Client, data);
        });
        return result;
    }

    async downloadDB(email, fileID) {
        var result = []
        await db.getToken(email).then(async token => {
            var content = fs.readFileSync('config/credentials.json');
            if (typeof token == 'undefined') {
                return [];
            }

            const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.

            oAuth2Client.setCredentials(token);
            await downloadDB(oAuth2Client, fileID);
        });
        return true;
    }
    async download(fileID, res,watch=false) {
        var result = []
        var data = fs.readFileSync('data.txt');
        data = JSON.parse(data);
        var email = data[fileID].username;
        var file = data[fileID]
        await db.getToken(email).then(async token => {
            var content = fs.readFileSync('config/credentials.json');
            if (typeof token == 'undefined') {
                return [];
            }

            const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.

            oAuth2Client.setCredentials(token);
            await download(oAuth2Client, file, res,watch);
        });
        return true;
    }

    upload(token, params) {


        fs.readFile('config/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            //authorize(JSON.parse(content), email, listFiles);
            //authorize(JSON.parse(content),email, getFile);
            authorize(JSON.parse(content), token, upload, params);
        });
    }

    async upload_S2D(email, params) {

        await db.getToken(email).then(async token => {
            var content = fs.readFileSync('config/credentials.json');
            if (typeof token == 'undefined') {
                return [];
            }

            const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.

            oAuth2Client.setCredentials(token);
            await upload_S2D(oAuth2Client, params);
        });

    }
}

function authorize(credentials, token, callback, params = {}) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.

    oAuth2Client.setCredentials(token);
    callback(oAuth2Client, params);

}

function upload(auth, params = {}) { //link to drive
    var url = params.url
    var isVideo = params.isVideo;
    var email = params.email;
    console.log(url);
    Axios({
        method: "GET",
        url: url,
        responseType: 'stream'
    }).then(response => {
        data = response.data;


        headers = response.headers;

        const drive = google.drive({ version: 'v3', auth });

        var fileMetadata = {
            'name': getName(url, isVideo, headers['content-disposition'])
        };

        if (isVideo == 'true') {
            var type = 'video/mp4'
        } else {
            var type = headers['content-type']
        }
        var media = {
            mimeType: type,
            body: data
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, res) {
            if (err) {
                // Handle error
                console.log(err);
            } else {
                //save details of file
                data = {}
                data[res.data.id] = getName(url, 'false', headers['content-disposition']);
                db.update('fileCollection', email, data);
                console.log('File Id: ', res.data.id);
            }
        });

        var size = headers['content-length'];
        var sum = 0;
        var p = 0;
        var name = getName(url, 'false', '');
        //console.log(size);
        data.on('data', chunk => {
            sum = sum + chunk.length
            progress = sum / size * 100;
            if (progress >= p) {
                p = p + 1
                chat.to(params.email, 'status', { progress: progress, fileName: name });
                console.log(progress, name);
            }
        });
    });




}

function upload_S2D(auth, params) { //link to drive

    var location = params.location;
    var fileName = params.fileName;
    var mimeType = params.mimeType;


    const drive = google.drive({ version: 'v3', auth });

    var fileMetadata = {
        'name': fileName
    };

    var media = {
        mimeType: mimeType,
        body: fs.createReadStream(location)
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('File Id: ', res.data.id);
        }
    });

    /* var size = headers['content-length'];
    var sum = 0;
    var p = 0;

    data.on('data', chunk => {
        sum = sum + chunk.length
        progress = sum / size * 100;
        if (progress >= p) {
            p = p + 1
            chat.to(params.email, 'status', { progress: progress, fileName: name });
            console.log(progress, name);
        }
    }); */

}

async function saveDB(auth, data = {}) { //update DB on drive

    fs.writeFileSync('data.txt', JSON.stringify(data));
    var id = "1XaBZpjIFFb1vCB0K7-s-jZpAKflyJCDR"

    const drive = google.drive({ version: 'v3', auth });
    const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('data.txt'),
    };
    drive.files.update({
        fileId: id,
        media: media,
    }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res.data);
    });
    /* drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, res) {
        if (err) {
            // Handle error
            console.log(err);
        } else {
            console.log('File Id: ', res.data.id);
        }
    }); */
}
async function downloadDB(auth, fileId) {   //download to server from drive
    const drive = google.drive({ version: 'v3', auth });
    var dest = fs.createWriteStream('data.txt');

    await drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
        async function (err, res) {
            await res.data
                .on('end', () => {
                    console.log('done');
                })
                .on('error', err => {
                    console.log('Error', err);
                })
                .pipe(dest);
        });
    return true;
}


async function download(auth, file, dest, watch = false) { //download to client from drive
    var fileId = file.id;
    var fileName = file.name;
    var fileSize = file.size;
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
        async function (err, res) {
            if (watch == false) {
                dest.set({
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': 'attachment; filename=' + fileName,
                    'content-length': fileSize
                });
            } else {
                dest.set({
                    'Content-Type': 'video/mp4'
                });
            }

            await res.data
                .on('end', () => {
                    console.log('downloded');
                })
                .on('error', err => {
                    console.log('Error', err);
                })
                .pipe(dest);
        });
    return true;
}

async function listFiles(auth, email) {
    const drive = google.drive({ version: 'v3', auth });
    var result = []
    await getList(drive, '', email).then(data => {
        result = data
    })
    return result;
}

async function getList(drive, pageToken, email) {
    var result = []
    await drive.files.list({
        //corpora: 'user',
        pageSize: 100,
        q: "mimeType='video/x-matroska' or mimeType='video/mp4' or mimeType='video/x-flv' or mimeType='application/x-mpegURL' or mimeType='video/MP2T' or mimeType='video/quicktime' or mimeType='video/x-msvideo' or mimeType='video/x-ms-wmv'",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(*)',
    }).then(async (res) => {
        const files = res.data.files;
        if (files.length) {
            console.log('processing..........');
            var data = processList(files, email);
            if (res.data.nextPageToken) {
                await getList(drive, res.data.nextPageToken, email).then(d => {
                    result = d.concat(data);
                })
            } else {
                result = data;
            }
            // files.map((file) => {
            //     console.log(`${file.name} (${file.id})`);
            // });
        } else {
            console.log('No files found.');
        }

    });
    return result
}

function processList(files, email) {
    var ds = []
    files.forEach(file => {
        //console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        //console.log(file);
        var f = {
            id: file.id,
            username: email,
            name: file.name.toLowerCase(),
            size: file.size,
            thumbnail: file.iconLink,
            url_view: file.webViewLink,
            url: "/download/" + file.id,
            mimeType: file.mimeType,
            modifiedTime: file.modifiedTime,
            //email: file.owners[0].emailAddress,
            //owner: file.owners[0].displayName
        }
        //fs.writeFileSync('data.json',JSON.stringify(f));
        if (typeof file.thumbnailLink != 'undefined') {
            f['thumbnail'] = file.thumbnailLink
        }
        ds.push(f);
        //console.log(file);
    });
    return ds;
}

function getFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data);
    });
}


function getName(url, isVideo, header) {



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

/* var drive = new Drive();

drive.getURL(); */

module.exports = Drive;
