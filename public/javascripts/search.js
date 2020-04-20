function search(){
    $.ajax('/search', {
        type: 'POST',  // http method
        data: {
            tags: "bad"
        },  // data to submit
        success: function (data, status, xhr) {
            console.log(data);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(errorMessage);
        }
    });
}