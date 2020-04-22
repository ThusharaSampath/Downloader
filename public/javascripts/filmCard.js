
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