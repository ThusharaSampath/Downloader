

function emit(title,msg){
    io = global.io;
    io.emit(title,msg);
}

function to(room,title,msg){
    io = global.io;
    io.to(room).emit(title,msg);
}




module.exports.emit = emit;
module.exports.to = to;
