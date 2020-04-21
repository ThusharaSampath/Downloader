
const cards = document.querySelectorAll('.card');

function transition() {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
  } else {
    this.classList.add('active');
  }
}

cards.forEach(card => card.addEventListener('click', transition));

function makecard() {
html = '
<div class="container" style="background-image: url(https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UY1200_CR91,0,630,1200_AL_.jpg)">
<div class="overlay">
  <div class = "items"></div>
  <div class = "items head">
    <p>Flower Embroidery Hoop Art</p>
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
</div>'

}