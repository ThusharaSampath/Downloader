

function emit(title,msg){
    io = global.io;
    io.emit(title,msg);
}
function init(io){
    global.io = io;
    io.on('connection',(socket)=>{
        console.log('User connected');
        socket.on('join',email=>{
            console.log();
            socket.join(email);
        });
    });
}
function to(room,title,msg){
    io = global.io;
    io.to(room).emit(title,msg);
}




module.exports.emit = emit;
module.exports.to = to;
module.exports.init = init;