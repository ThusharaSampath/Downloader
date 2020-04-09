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
            createStatusBar(data.name);
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

function createStatusBar(name){
    html = `
    <p>${name}</p>
    <div class="progress">
    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 0%" aria-valuenow="25"
    aria-valuemin="0" aria-valuemax="100" id='p_${name}'></div>
    </div>`
    $('#progress_wrapper').html($('#progress_wrapper').val()+html);
}