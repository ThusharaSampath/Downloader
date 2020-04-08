function signUp(){
    $.ajax('/signUp', {
        type: 'POST',  // http method
        data: {
            email: $('#email').val(),
            password :  $('#password').val(),
            fname : $('#fname').val(),
            lname : $('#lname').val(),
            tp : $('#tp').val(),
        },  // data to submit
        success: function (data, status, xhr) {
            if(data.saved){
                window.location.replace("/login");
            }else{
                alert("something went wrong");
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}