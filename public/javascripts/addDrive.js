$(document).ready(()=>{
});

function addDrive(){
    $.ajax('/addDrive', {
        type: 'POST',  // http method
        data: {
            token: $('#token').val(),
            
        },  // data to submit
        success: function (data, status, xhr) {
            console.log(data);
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

