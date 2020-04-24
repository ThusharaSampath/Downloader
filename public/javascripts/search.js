import { networkmanagement } from "googleapis/build/src/apis/networkmanagement";

$(document).ready(()=>{
  search();
});

function search() {
  var pageNo = 1;
  var pages = 5
  $.ajax('/search', {
      type: 'POST',  // http method
      data: {
          tags: $('#tags').val()
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
}
function makePager(pageNo,pages){

  if (pageNo==1) {
    html=`<button id="btnPrevious" class="btn previous" value="123">&laquo; Previous</button>   
    <script></script>   
    for (i=1;i<4;i++) {  
      <button id="pager${i}" class="btn round" value="${i}">${i}</button>
    }
    <button id="btnNext" class="btn next ">Next &raquo;</button>`
  } else {
    html=`<button id="btnPrevious" class="btn previous" value="123">&laquo; Previous</button>   
    <script></script>   
    for (i=1;i<4;i++) {  
      <button id="pager${i}" class="btn round" value="${i}">${i}</button>
    }
    <button id="btnNext" class="btn next ">Next &raquo;</button>`
  }
 
  return html
};
function makeButton(i){
  btn=` <button id="pager${i}" class="btn round" value="${i}">${i}</button>`
  return btn;
}