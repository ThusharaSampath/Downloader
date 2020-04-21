import { json } from "body-parser"

function test() {
  
  var txt = '{"id":"1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn","username":"downloadto2drive@gmail.com","name":"like.a.boss.2020.720p.bluray.x264.aac-[yts.mx].mp4","size":"803084572","thumbnail":"https://lh3.googleusercontent.com/rGInwhnPEK2F1gxDKcGI5c66TQnmVBCCSKSCQBJ6T4HTamLaZ0p_4Gv0tP2p4Okf4yLHRAgbUFk=s220","url_view":"https://drive.google.com/file/d/1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn/view?usp=drivesdk","url":"https://drive.google.com/uc?id=1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn&export=download","mimeType":"video/mp4","email":"downloadto2drive@gmail.com","owner":"download2 drive"}'
  var j =JSON.parse(txt);
  makecard(j)
}


function makecard(Json) {
th
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
  console.log("emited")
}