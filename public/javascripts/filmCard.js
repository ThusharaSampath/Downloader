
data = `{"1b8psGiOeATyQYjNAnLFehYlVu1VPQz_-":{"id":"1b8psGiOeATyQYjNAnLFehYlVu1VPQz_-","username":"","name":"[kamigami] hunter x hunter - 104 [x264 1280x720 aac sub(ch,jp)].mkv","size":"192183819","thumbnail":"https://lh3.googleusercontent.com/X8BPbQq6MGSqNRAe06kL8E1LFH35ual2wjClZeZ0HI8hn1f-p14y96JEECeU3qZQMEfv8Vtbdqs=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/1b8psGiOeATyQYjNAnLFehYlVu1VPQz_-/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=1b8psGiOeATyQYjNAnLFehYlVu1VPQz_-&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"},"1_n9XT_EpNVVA0QkJIFVwwftjQDI--4Qo":{"id":"1_n9XT_EpNVVA0QkJIFVwwftjQDI--4Qo","username":"","name":"[kamigami] hunter x hunter - 103 [x264 1280x720 aac sub(ch,jp)].mkv","size":"180231846","thumbnail":"https://lh3.googleusercontent.com/sVmZblp7-AK5w66w-3HR6KjpOASemo_Ce8as3OYJT21QO6gWe0NkFdZYtsloTjRbRvJSQZMtgyg=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/1_n9XT_EpNVVA0QkJIFVwwftjQDI--4Qo/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=1_n9XT_EpNVVA0QkJIFVwwftjQDI--4Qo&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"},"13Pn864zkt9NX1gz1RkUsJ38CF0ADZjbN":{"id":"13Pn864zkt9NX1gz1RkUsJ38CF0ADZjbN","username":"","name":"[kamigami] hunter x hunter - 102 [x264 1280x720 aac sub(ch,jp)].mkv","size":"173250018","thumbnail":"https://lh3.googleusercontent.com/aPzktbWHRQ25eMZItb1eF2gCAxYBwR6TQWyjPtpw_udga7fV_2QqWp83EExw-Ir9XgScrcpbbZs=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/13Pn864zkt9NX1gz1RkUsJ38CF0ADZjbN/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=13Pn864zkt9NX1gz1RkUsJ38CF0ADZjbN&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"},"11u-XhjjiEj7qr2KuopAAgelT_aBFdEDl":{"id":"11u-XhjjiEj7qr2KuopAAgelT_aBFdEDl","username":"","name":"[kamigami] hunter x hunter - 101 [x264 1280x720 aac sub(ch,jp)].mkv","size":"185115184","thumbnail":"https://lh3.googleusercontent.com/VJn64GTkjlizA6c4vj6_2r4tdCq1mMPpzj7l_2oKWK_wVk-V4e8AC4KPvHo-xoAqSfBuM14tSYk=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/11u-XhjjiEj7qr2KuopAAgelT_aBFdEDl/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=11u-XhjjiEj7qr2KuopAAgelT_aBFdEDl&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"}}`
function test() {
  $.ajax('/search', {
    type: 'POST',  // http method
    data: {
      tags: "money heist"
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


// function makeAcard(Json) {
//   html = `
//   <div class="container column" style="background-image: url(${Json.thumbnail})">
//   <div class="overlay">
//     <div class = "items">
//       <div class = "items head">
//         <h7>${Json.name}</h7>
//         <hr>
//       </div>
//       <div class = "items price">
//         <p class="new">Dowunloads - </p>
//         <p class="new">Rate - </p>
//       </div>
//       <div class="items cart">      
//         <button type="button" class="btn btn-outline-info"><i class="fa fa-download"></i> Download</button>
//         <button type="button" class="btn btn-outline-info"><i class="fa fa-book"></i> Watch</button>
//       </div>
//     </div>
//   </div>
//     <div>
    
    
    
//     </div>
//   </div> 
  
//   `
//   return html;
// }
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
        <td>95</td>
      </tr>
      <tr>
        <th><i class="fa fa-eye"></i> Watched</th>
        <td>65</td>
      </tr>
      
      <tr>
        <th><i class="fa fa-star"></i> Rating</th>
        <td>110</td>
      </tr>

    </tbody></table>
    
    <div class="card__abilities">
      <h4 class="card__ability">
        <button class="btn btn-secondary card__label"><i class="fa fa-download"></i> Download</button>
        
      </h4>
      <h4 class="card__ability">
        <button class="btn btn-secondary card__label"><i class="fa fa-eye"></i> Watch    </button>
      </h4>
    </div>
  </figcaption>
</figure>
  `
  return html;
}