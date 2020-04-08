const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const Axios = require('axios');

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

const Document = require('../model/Document');
var document = new Document();


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
            document.saveToken(token, customer);
        });

    }

    getFiles(token) {
        fs.readFile('config/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), token, listFiles);
            //authorize(JSON.parse(content), getFile);
            //authorize(JSON.parse(content), uploadFile);
        });
    }

    upload(token, url) {


        fs.readFile('config/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            //authorize(JSON.parse(content), email, listFiles);
            //authorize(JSON.parse(content),email, getFile);
            authorize(JSON.parse(content), token, uploadFile, url);
        });
    }
}

function authorize(credentials, token, callback, url = '') {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.

    oAuth2Client.setCredentials(token);
    callback(oAuth2Client, url);

}

function uploadFile(auth, url = '') {

   

    Axios({
        method: "GET",
        url: url,
        responseType: 'stream'
    }).then(response => {
        data = response.data;


        headers = response.headers;

        const drive = google.drive({ version: 'v3', auth });
        var fileMetadata = {
            'name': getName(url)
        };
        var media = {
            mimeType: headers['content-type'],
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
                console.log('File Id: ', res.data.id);
            }
        });

        size = headers['content-length']
        data.on('data',chunk=>{
            console.log(chunk.length / size *100 );
        });
    });




}


function listFiles(auth, url = '') {
    const drive = google.drive({ version: 'v3', auth });
    getList(drive, '');
}

function getList(drive, pageToken) {
    drive.files.list({
        corpora: 'user',
        pageSize: 10,
        //q: "name='elvis233424234'",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(*)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            processList(files);
            if (res.data.nextPageToken) {
                getList(drive, res.data.nextPageToken);
            }

            // files.map((file) => {
            //     console.log(`${file.name} (${file.id})`);
            // });
        } else {
            console.log('No files found.');
        }
    });
}

function processList(files) {
    console.log('Processing....');
    files.forEach(file => {
        console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        //console.log(file);
    });
}

function getFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data); c
    });
}


function getName(url) {
    var arr = url.split('/');
    name_ = arr[arr.length - 1];

    arr = name_.split('\\');
    name = arr[arr.length - 1];
    return name
}

/* var drive = new Drive();

drive.getURL(); */

module.exports = Drive;
