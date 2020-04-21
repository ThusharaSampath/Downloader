
const cards = document.querySelectorAll('.card');

function transition() {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
  } else {
    this.classList.add('active');
  }
}

cards.forEach(card => card.addEventListener('click', transition));

function makecard(Json) {

html = `
<div class="container" style="background-image: url(${Json.thumbnail})">

<div class="overlay">
  <div class = "items"></div>
  <div class = "items head">
    <p>${Json.name}</p>
    <hr>
  </div>
  <div class = "items price">
    <p class="old">$699</p>
    <p class="new">$345</p>
  </div>
  <div class="items cart">      
    <button type="button" class="btn btn-outline-info"><i class="fa fa-download"></i>Download</button>
    <button type="button" class="btn btn-outline-info"><i class="fa fa-mov"></i>Watch</button>
  </div>
</div>
</div>`

}