var Document = require('../model/Document');
var document = new Document();
function init(io){
    global.io = io;
    io.on('connection',(socket)=>{
        console.log('User connected');
        document.getDB();
        socket.on('join',email=>{
            console.log();
            socket.join(email);
        });
    });
}

module.exports.init = init;