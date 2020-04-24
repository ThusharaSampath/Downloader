var data='{"1cRncYvIEZBtIHsM9dxXbJ8R142zHeWU1":{"id":"1cRncYvIEZBtIHsM9dxXbJ8R142zHeWU1","username":"","name":"[kamigami] hunter x hunter - 06 [x264 1280x720 aac sub(ch,jp)].mkv","size":"204217311","thumbnail":"https://lh3.googleusercontent.com/YL5dFzUl7UjDRe7YppwzuP-co9csf9-JxdmyY6jSzNkuqnImEnE5733LqtzhjNljfTOjkzS_0-A=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/1cRncYvIEZBtIHsM9dxXbJ8R142zHeWU1/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=1cRncYvIEZBtIHsM9dxXbJ8R142zHeWU1&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"}}'



<<<<<<< HEAD
=======

$(document).ready(()=>{
  test();
});
>>>>>>> 70c73031059e6220d0034190354296f582110da3
function test() {
  ///////////////////////////
  const fs = require('fs')
  fs.readFile('data.txt', (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
    
  })
  ///////////////////////////
  $.ajax('/search', {
      type: 'POST',  // http method
      data: {
          tags: ''
      },  // data to submit
      success: function (data, status, xhr) {
          var obj = JSON.parse(data);
          var html = ''
          for (var key in obj) {
              html = html + makeAcard(obj[key]);
          }
          $('#rsltContainer').html(html);
      },
      error: function (jqXhr, textStatus, errorMessage) {
          alert(errorMessage);
      }
  });
}

function view(id) {
  alert(id);
  $.ajax('/count/view', {
      type: 'POST',  // http method
      data: {
          id: id
      },  // data to submit
      success: function (data, status, xhr) {
          console.log('viewed!');
      },
      error: function (jqXhr, textStatus, errorMessage) {
          alert(errorMessage);
      }
  });
}

function down(id) {
  alert(id);
  $.ajax('/count/down', {
      type: 'POST',  // http method
      data: {
          id: id
      },  // data to submit
      success: function (data, status, xhr) {
          console.log('viewed!');
      },
      error: function (jqXhr, textStatus, errorMessage) {
          alert(errorMessage);
      }
  });
}

<<<<<<< HEAD

function makeAcard(Json) {
  html = `
  <figure class="card card--dark">
  <div class="card__image-container">
    <img src=${Json.thumbnail} alt="Umbreon" class="card__image">   
  </div>
  
  <figcaption class="card__caption">
    <h1 class="card__name">${Json.name}</h1>
=======
>>>>>>> 70c73031059e6220d0034190354296f582110da3




function makeAcard(Json) {
    html = `
    <figure class="card card--dark">
    <div class="card__image-container">
      <img src=${Json.thumbnail} alt="Umbreon" class="card__image">   
    </div>
    
    <figcaption class="card__caption">
      <h1 class="card__name">${Json.name}</h1>
  
      <h3 class="card__type">
      ${Json.mimeType}
      </h3>
  
      <table class="card__stats">
        <tbody><tr>
          <th><i class="fa fa-download"></i> Download</th>
          <td>${Json.down}</td>
        </tr>
        <tr>
          <th><i class="fa fa-eye"></i> Watched</th>
          <td>${Json.view}</td>
        </tr>
        
<<<<<<< HEAD
      </h4>
      <h4 class="card__ability">
        <button class="btn btn-secondary card__label"><i class="fa fa-eye"></i> Watch    </button>
      </h4>
    </div>
  </figcaption>
</figure>
  `
  console.log(Json.name)
  return html;
=======
        <tr>
          <th><i class="fa fa-star"></i> Rating</th>
          <td>110</td>
        </tr>
  
      </tbody></table>
      
      <div class="card__abilities">
        <h4 class="card__ability">
          <a class="btn btn-secondary card__label" target='_blank' href="${Json.url}" onClick="down('${Json.id}')"><i class="fa fa-download"></i> Download</a>
        </h4>
        <h4 class="card__ability">
          <a class="btn btn-secondary card__label" target='_blank' href="${Json.url_view}"  onClick="view('${Json.id}')"><i class="fa fa-eye"></i>Watch</a>
        </h4>
      </div>
    </figcaption>
  </figure>
    `
    return html;
>>>>>>> 70c73031059e6220d0034190354296f582110da3
}