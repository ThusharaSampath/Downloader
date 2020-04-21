
data = `{"1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn":{"id":"1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn","username":"downloadto2drive@gmail.com","name":"like.a.boss.2020.720p.bluray.x264.aac-[yts.mx].mp4","size":"803084572","thumbnail":"https://lh3.googleusercontent.com/NVMwlnGBG3ouUZRJ67g4hWiEmOwQWXJA0gyRZHSJLnP9PftWOO8q0sWO_ZD18pL2QYHe9ppzF40=s220","url_view":"https://drive.google.com/file/d/1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn/view?usp=drivesdk","url":"https://drive.google.com/uc?id=1VQT1-F8mI4MZ77Z7bM6IlFaz0JeujMsn&export=download","mimeType":"video/mp4","email":"downloadto2drive@gmail.com","owner":"download2 drive"},"1ynaQgK_VitxMqz4pN0oUICIm-0xV_8SI":{"id":"1ynaQgK_VitxMqz4pN0oUICIm-0xV_8SI","username":"hackerboy.8511@gmail.com","name":"john.wick.3.parabellum.2019.720p.bluray.hindi-english.x264-katmoviehd.nl.mkv","size":"1191180252","thumbnail":"https://lh3.googleusercontent.com/ZChMDuSjr5h_Fho1T3KcnGUx94ZlNIq54ZxQTZfwcGoKDVkm67uAsMfzjRJv_X0ZvNalDBQkAqo=s220","url_view":"https://drive.google.com/file/d/1ynaQgK_VitxMqz4pN0oUICIm-0xV_8SI/view?usp=drivesdk","url":"https://drive.google.com/uc?id=1ynaQgK_VitxMqz4pN0oUICIm-0xV_8SI&export=download","mimeType":"video/x-matroska","email":"hackerboy.8511@gmail.com","owner":"hacker boy"},"1-Pv8KhMakfgdA2q6P72dWf8YR3cbS4IN":{"id":"1-Pv8KhMakfgdA2q6P72dWf8YR3cbS4IN","username":"hackerboy.8511@gmail.com","name":"5. manually_payload_binding_with_any_apk_part_1.mp4","size":"153520996","thumbnail":"https://lh3.googleusercontent.com/guBIG3puoL6NVJjrZ1DeVx-QNGcKwg-plZWCGZtV1IKDaKfSmRUxNUxBh5MIvP_qj6sUp_kryIU=s220","url_view":"https://drive.google.com/file/d/1-Pv8KhMakfgdA2q6P72dWf8YR3cbS4IN/view?usp=drivesdk","url":"https://drive.google.com/uc?id=1-Pv8KhMakfgdA2q6P72dWf8YR3cbS4IN&export=download","mimeType":"video/mp4","email":"asoliya16@gmail.com","owner":"Prashant Asoliya"},"1L-HU-IE9oeeYjcHcLRJrMJIkyGnxG6u5":{"id":"1L-HU-IE9oeeYjcHcLRJrMJIkyGnxG6u5","username":"hackerboy.8511@gmail.com","name":"nikunj b .mp4","size":"46697524","thumbnail":"https://lh3.googleusercontent.com/rGInwhnPEK2F1gxDKcGI5c66TQnmVBCCSKSCQBJ6T4HTamLaZ0p_4Gv0tP2p4Okf4yLHRAgbUFk=s220","url_view":"https://drive.google.com/file/d/1L-HU-IE9oeeYjcHcLRJrMJIkyGnxG6u5/view?usp=drivesdk","url":"https://drive.google.com/uc?id=1L-HU-IE9oeeYjcHcLRJrMJIkyGnxG6u5&export=download","mimeType":"video/mp4","email":"hackerboy.8511@gmail.com","owner":"hacker boy"},"1mozRl_DBg2ntqTYLQRLQyT3VYf3Bvy1S":{"id":"1mozRl_DBg2ntqTYLQRLQyT3VYf3Bvy1S","username":"","name":"[kamigami] hunter x hunter - 115 [x264 1280x720 aac sub(ch,jp)].mkv","size":"108181709","thumbnail":"https://lh3.googleusercontent.com/IYnmYyTGPmmVcVHsZlGwbycOnxoy0nUxfSZyQNHgoApg240W1m0dTDxRucvnMM1kvMKqjFTbd9o=s220","url_view":"https://drive.google.com/a/coung.aobe.nl/file/d/1mozRl_DBg2ntqTYLQRLQyT3VYf3Bvy1S/view?usp=drivesdk","url":"https://drive.google.com/a/coung.aobe.nl/uc?id=1mozRl_DBg2ntqTYLQRLQyT3VYf3Bvy1S&export=download","mimeType":"video/x-matroska","email":"wr1092337@swccd.edu","owner":"Wayne Rosales"}}`

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
    </div>
 <div>
  <h5 class="tumbName" id="thumbName">${Json.name}</h5>
 </div> 
  `
  return html;
}