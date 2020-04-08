$(document).ready(() => {
    socket = io();
    socket.on('status', (data) => {
        $('#prbr').css('width',data.progress+'%');
    });

});

function download(){
    $.ajax('/', {
        type: 'POST',  // http method
        data: {
            url: $('#url').val()
        },  // data to submit
        success: function (data, status, xhr) {
            //console.log(data);
            socket.emit('join',data.email);
            /* if(data.logged){
                window.location.replace("/login");
            }else{
                alert("try again")
            } */
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}