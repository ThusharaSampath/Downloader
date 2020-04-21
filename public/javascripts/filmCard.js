

function test() {

  
  var j =JSON.parse(txt);
  makeAcard(j)
}


function makeAcard(Json) {
  html = `
  <div class="container" style="background-image: url(${Json.thumbnail})">
  <div class="overlay">
    <div class = "items"></div>
    <div class = "items head">
      <h7>${Json.name}</h7>
      <hr>
    </div>
    <div class = "items price">
      <p class="old">Dowunloads - 7</p>
      <p class="new">Rate - 6</p>
    </div>
    <div class="items cart">      
      <button type="button" class="btn btn-outline-info"><i class="fa fa-download"></i>Download</button>
      <button type="button" class="btn btn-outline-info"><i class="fa fa-mov"></i>Watch</button>
    </div>
  </div>
 <div>
  <h5 class="tumbName" id="thumbName">${Json.name}</h5>
 </div> 
  `
  console.log(html);
}