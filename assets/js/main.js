(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

/* Ajax untu menampilkan list pokemon*/
$.ajax({
  url: 'https://pokeapi.co/api/v2/pokemon',
  method: 'GET',
  success: function(data) {
      let text= "";
      $.each(data.results, function (key, poke){
          text += `
              <div class="col-xl-2 col-md-4">
                  <div class="border border-white bg-white bg-opacity-25 rounded-3" data-bs-toggle="modal" data-bs-target="#detailPK" onclick="detail('${poke.url}')">
                      <img src="assets/img/poke-ball.png" class="w-50 h-50 m-3">
                      <h3>${poke.name}</h3>
                  </div>
              </div>
          `;
      });
      $("#listPK").html(text);
  },
  error: function(error) {
    console.log('Error:', error);
  }
});

/* Ajax untuk menampilkan detail pokemon */
function detail(res) {
  // console.log(res);
  $.ajax({
    url: res,
    success: function (result) {
      console.log(result);

      let text1 = `
      <div class="row">
        <div class="col-4">
          <div class="">
            <img src="${result.sprites.other.dream_world.front_default}" class="h-10  0 w-100">
            <h3 class="text-center">${result.name}</h3>
            <p class="btn btn-primary ml-2">${result.types[0].type.name}</p>
          </div>
        </div>
        <div class="col-8">
          <div>
            <canvas id="myChart"></canvas>
          </div>
          <script>
          const ctx = document.getElementById('myChart');
          const data = {
              labels: [
                  'HP',
                  'Attack',
                  'Defense',
                  'Spesial-Attack',
                  'Spesial-Defense',
                  'Speed'
              ],
              datasets: [{
                  label: 'Pokemon Status',
                  data: [
                    ${result.stats[0].base_stat},
                    ${result.stats[1].base_stat},
                    ${result.stats[2].base_stat},
                    ${result.stats[3].base_stat},
                    ${result.stats[4].base_stat},
                    ${result.stats[5].base_stat}
                  ],
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  pointBackgroundColor: 'rgb(255, 99, 132)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(255, 99, 132)'
              }]
          };
          new Chart(ctx, {
              type: 'radar',
              data: data,
              options: {
                  elements: {
                      line: {
                          borderWidth: 3
                      }
                  }
              },
          });
          </script>
        </div>
    <div class="col-12">
    <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Info
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                            <input type="text" class="form-control" value="${result.name}" disabled>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Height</span>
                            <input type="text" class="form-control" value="${result.height}0 cm" disabled>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Weight</span>
                            <input type="text" class="form-control" value="${result.weight} kg" disabled>
                        </div>
                    </div>
                </div>
      </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Abilities
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div class="btn btn-primary m-1">
          ${result.abilities[0].ability.name}
        </div>
        <div class="btn btn-primary m-1">
          ${result.abilities[1].ability.name}
        </div>
      </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      Pokemon Moves
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div class="btn btn-primary m-1">
          ${result.moves[0].move.name}
        </div>
        <div class="btn btn-primary m-1">
          ${result.moves[1].move.name}
        </div>
        <div class="btn btn-primary m-1">
          ${result.moves[2].move.name}
        </div>
        <div class="btn btn-primary m-1">
          ${result.moves[3].move.name}
        </div>
        <div class="btn btn-primary m-1">
          ${result.moves[4].move.name}
        </div>
      </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      Photocard
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div class="row">
          <div class="col-4">
            <img src="${result.sprites.front_default}" class="img-thumbnail">
          </div>
          <div class="col-4">
            <img src="${result.sprites.back_default}" class="img-thumbnail">
          </div>
          <div class="col-4">
            <img src="${result.sprites.front_shiny}" class="img-thumbnail">
          </div>
        </div>
      </div>
  </div>
</div>
    </div>
      </div>
      `
      $("#modalPK").html(text1);
    },
  });
}
