const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var Customer = require('../model/Customer');
const db = require('./db');

var customer = new Customer();
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
const TOKEN_PATH = 'config/token.json';

// Load client secrets from a local file.
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback, params = {}) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    /*
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        url = callback(oAuth2Client, params);
        //list files and upload file
        //callback(oAuth2Client, '0B79LZPgLDaqESF9HV2V3YzYySkE');//get file
    });
    */

    token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    await callback(oAuth2Client, params).then((res) => {
        url = res;
    });;
    return url;


}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
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


async function processList(files) {
    console.log('Processing....');
    files.forEach(file => {
        console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
        //console.log(file);
    });
}
async function uploadFile(auth, params) {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        'name': params.name
    };
    var media = {
        mimeType: params.mimeType,
        body: params.file
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
            console.log(customer.userData.email);
            permission =  {
                'type': 'user',
                'role': 'writer',
                'emailAddress': customer.userData.email
              }
            drive.permissions.create({
                resource: permission,
                fileId: res.data.id,
                fields: 'id',
            });
        }
    });
}
function getFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data); c
    });
}

async function getAFile(auth, params) {
    //return "12589";
    const drive = google.drive({ version: 'v3', auth });
    var url;
    await drive.files.list({
        q: "name='" + params.name + "'",
        fields: 'files(*)',
    }).then(res => {
        url = res.data.files;
    });
    return url;

}




class Drive {

    constructor() {

    }

    listFiles = function (name) {
        fs.readFile('config/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), listFiles);
            //authorize(JSON.parse(content), getFile);
            //authorize(JSON.parse(content), uploadFile);
        });
    }
    uploadFile = function (file, id) {
        var fileName = "uploads/" + id;
        fs.open(fileName, 'a', (err, fd) => {
            let bytes = fs.writeSync(fd, file.data);
            console.log(bytes);
            fs.readFile('config/credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Drive API.
                //authorize(JSON.parse(content), listFiles);
                //authorize(JSON.parse(content), getFile);
                console.log(data);
                authorize(JSON.parse(content), uploadFile, { file: fs.createReadStream(fileName), mimeType: file.mimeType, name: id });
                console.log("---------------file uploaded to drive-----------");
                fs.closeSync(fd);
                fs.unlinkSync(fileName);
            });
        });
        //fs.closeSync(file);
        //fs.unlink(id);
    }

    getAFile = async (name) => {
        var content = fs.readFileSync('config/credentials.json');
        var returnData;
        await authorize(JSON.parse(content), getAFile, { name: name }).then(res => {
            returnData = res;
        });
        //console.log(returnData);

        return returnData;

        //authorize(JSON.parse(content), getFile);
        //authorize(JSON.parse(content), uploadFile);

    }
}

module.exports = Drive;