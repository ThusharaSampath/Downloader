

function addDrive() {
    $.ajax('/addDrive', {
        type: 'POST',  // http method
        data: {
            token: $('#token').val(),

        },  // data to submit
        success: function (data, status, xhr) {
            console.log(data);
            window.location.replace("/");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}

$(document).ready(() => {
    socket = io();
    socket.on('status', (data) => {
        console.log(data);
        $('#p_'+formatName(data.fileName)).css('width',data.progress+'%');
    });
});

function download(){
    if($('#url').val()=='') return 0;

    console.log($('#isVideo').prop("checked"));

    $.ajax('/', {
        type: 'POST',  // http method
        data: {
            url: $('#url').val(),
            isVideo : $('#isVideo').prop("checked")
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
    aria-valuemin="0" aria-valuemax="100" id='p_${formatName(name)}'></div>
    </div>`
    $('#progress_wrapper').html($('#progress_wrapper').html()+html);
}

function formatName(name){
    return name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

//////////////////////////////////////////////////
$('.buy').click(function(){
    $('.bottom').addClass("clicked");
  });
  
  $('.remove').click(function(){
    $('.bottom').removeClass("clicked");
  });