function download(){
    $.ajax('/', {
        type: 'POST',  // http method
        data: {
            url: $('#url').val(),
            
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