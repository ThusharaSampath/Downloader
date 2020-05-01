


$(document).ready(() => {
    search();
  });
  
  function search() {
    
    $.ajax('/search', {
      type: 'POST',  // http method
      data: {
        tags: "",
        page : 0
      },  // data to submit
      success: function (data, status, xhr) {
        var D = JSON.parse(data);
        var obj = D.cards;
        pageNo = D.CPage+1;
        pages = D.Pages;
        console.log(D)
        var html = ''
        for (var key in obj) {
          html = html + makeAcard(obj[key]);
        }
        $('#rsltContainer').html(html);
        $('#pager').html(makePager(pageNo,pages));
        
      },
      error: function (jqXhr, textStatus, errorMessage) {
        alert(errorMessage);
      }
    });
  }
  function Search(ID) { //search next and previous 
  
    $.ajax('/search', {
      type: 'POST',  // http method
      data: {
        tags: "",
        page : ID-1
  
      },  // data to submit
      success: function (data, status, xhr) {
        var D = JSON.parse(data);
        var obj = D.cards;
        pageNo = D.CPage +1;
        pages = D.Pages;
        console.log(D)
        var html = ''
        for (var key in obj) {
          html = html + makeAcard(obj[key]);
        }
        $('#rsltContainer').html(html);
        $('#pager').html(makePager(pageNo,pages));
        
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
  function makePager(pageNo, pages) {
  
    if (pageNo != 1 && pageNo != pages & pages > 3) {
      html = `<button id="${pageNo - 2}" class="btn previous" value="${pageNo - 2}" onClick="Search(this.id)">&laquo; Previous</button>`
      html = html + `<button id="${pageNo - 1}" class="btn round" value="${pageNo - 1}" onClick="Search(this.id)">${pageNo - 1}</button>`
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
      html = html + `<button id="${pageNo + 1}" class="btn round" value="${pageNo + 1}" onClick="Search(this.id)">${pageNo + 1}</button>`
      html = html + `<button id="${pageNo + 2}" class="btn next" value="${pageNo + 2}" onClick="Search(this.id)">Next &raquo;</button>`
    } else if (pageNo == 1 && pages > 3) {
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
      html = html + `<button id="${pageNo + 1}" class="btn round" value="${pageNo + 1}" onClick="Search(this.id)">${pageNo + 1}</button>`
      html = html + `<button id="${pageNo + 2}" class="btn round" value="${pageNo + 2}" onClick="Search(this.id)">${pageNo + 2}</button>`
      html = html + `<button id="${pageNo + 3}" class="btn next" value="${pageNo + 3}" onClick="Search(this.id)">Next &raquo;</button>`
  
    } else if (pageNo == 1 && pages == 1) {
      html = ``
  
      html = html + `<button id="1" class="btn round" value="1" onClick="Search(this.id)">1</button>`
    } else if (pageNo == 1 && pages == 2) {
      html = ``
  
      html = html + `<button id="1" class="btn round" value="1"  onClick="Search(this.id)">1</button>`
      html = html + `<button id="2" class="btn round" value="2"  onClick="Search(this.id)">2</button>`
    } else if (pageNo == 1 && pages == 3) {
      html = ``
  
      html = html + `<button id="1" class="btn round" value="1"  onClick="Search(this.id)">1</button>`
      html = html + `<button id="2" class="btn round" value="2" onClick="Search(this.id)">2</button>`
      html = html + `<button id="3" class="btn round" value="3" onClick="Search(this.id)">3</button>`
  
    } else if (pageNo != 1 && pageNo == pages && pages > 3) {
      html = `<button id="${pageNo - 3}" class="btn previous" value="${pageNo - 3}" onClick="Search(this.id)">&laquo; Previous</button>`
      html = html + `<button id="${pageNo - 2}" class="btn round" value="${pageNo - 2}" onClick="Search(this.id)">${pageNo - 2}</button>`
      html = html + `<button id="${pageNo - 1}" class="btn round" value="${pageNo - 1}" onClick="Search(this.id)">${pageNo - 1}</button>`
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
  
    } else if (pageNo != 1 && pageNo == pages && pages == 3) {
      html = ``
      html = html + `<button id="${pageNo - 2}" class="btn round" value="${pageNo - 2}" onClick="Search(this.id)">${pageNo - 2}</button>`
      html = html + `<button id="${pageNo - 1}" class="btn round" value="${pageNo - 1}" onClick="Search(this.id)">${pageNo - 1}</button>`
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
  
    } else if (pageNo != 1 && pageNo == pages && pages == 2) {
  
      html = ``
      html = html + `<button id="${pageNo - 1}" class="btn round" value="${pageNo - 1}" onClick="Search(this.id)">${pageNo - 1}</button>`
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
  
    } else if (pageNo == 2 && pages == 3) {
      html = ``
      html = html + `<button id="${pageNo - 1}" class="btn round" value="${pageNo - 1}" onClick="Search(this.id)">${pageNo - 1}</button>`
      html = html + `<button id="${pageNo}" class="btn round" value="${pageNo}" onClick="Search(this.id)">${pageNo}</button>`
      html = html + `<button id="${pageNo + 1}" class="btn round" value="${pageNo + 1}" onClick="Search(this.id)">${pageNo + 1}</button>`
    }
  
    return html
  };
  // Material Select Initialization
$(document).ready(function() {
  $('.mdb-select').materialSelect();
  });