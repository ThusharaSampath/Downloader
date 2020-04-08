function login(){
    $.ajax('/login', {
        type: 'POST',  // http method
        data: {
            email: $('#email').val(),
            password :  $('#password').val()
        },  // data to submit
        success: function (data, status, xhr) {
            if(data.logged){
                window.location.replace("/login");
            }else{
                alert("try again")
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}