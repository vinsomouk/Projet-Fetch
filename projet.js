var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
    sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    sidenav.classList.remove("active");
}

const apiKey = "81e1b94cd27c6a6afba6ebacbb80d97e";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resultContainer1 = document.querySelector(".result-container");
const mediaTypeSelect = document.querySelector("#media-type-select");
// Fonction pour afficher les résultats de la recherche
function displayResult1(data) {
  // Vider le conteneur de résultats
  resultContainer1.innerHTML = "";

  // Afficher les résultats sous forme de cartes
  const cards = data.results.slice(0, 6).map(result => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="details.html?id=${result.id}"><img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="${result.title}"></a>
      <div class="card-body">
        <h5 class="card-title">${result.title}</h5>
        <p class="card-text">${result.overview}</p>
        <p class="card-text"><small class="text-muted">Date de sortie : ${result.release_date}</small></p>
      </div>
    `;
    return card;
  });

  // Ajouter les cartes au conteneur de résultats
  cards.forEach(card => {
    resultContainer1.appendChild(card);
  });
}

// Fonction pour effectuer une recherche
function search(query, mediaType) {
  // Appeler l'API pour effectuer la recherche
  fetch(`https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      // Afficher les résultats de la recherche
      displayResult1(data);
      data0 = data.results
    })
    
}
// Ajouter un événement de clic sur le bouton de recherche
searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    const mediaType = mediaTypeSelect.value;
    search(query, mediaType);
  });
  


// Variables globales

const resultsContainer2 = document.querySelector('.result-container');
const pageInfo = document.querySelector('.page-info');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const resultsPerPageSelect = document.querySelector('#results-per-page-select');

let currentPage = 1;
let resultsPerPage = parseInt(resultsPerPageSelect.value);
let totalPages;
let data0 = [];

// Fonction pour afficher les résultats de la page courante
function displayResult2() {
    
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const sortBy = sortSelect.value;
  
  
  const resultsToDisplay = data0.slice(startIndex, endIndex);
   
  resultsContainer2.innerHTML = '';

  resultsToDisplay.forEach(result => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="details.html"><img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="${result.title}"></a>
      <div class="card-body">
        <h5 class="card-title">${result.title}</h5>
        <p class="card-text">${result.overview}</p>
        <p class="card-text"><small class="text-muted">Date de sortie : ${result.release_date}</small></p>
      </div>
    `;
    resultsContainer2.appendChild(card);
  });

  // Afficher les informations de pagination
  const totalResults = data0.length;
  const startResult = startIndex + 1;
  const endResult = Math.min(endIndex, totalResults);

  
  pageInfo.textContent = `Affichage des résultats ${startResult} à ${endResult} sur ${totalResults}`;

  totalPages = Math.ceil(totalResults / resultsPerPage);

  // Afficher ou masquer les boutons de pagination en fonction de la page courante
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentPage === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// Fonction pour changer de page
function goToPage(page) {
  currentPage = page;
  displayResult2();
}

// Fonction pour changer le nombre de résultats affichés par page
function changeResultsPerPage() {
  resultsPerPage = parseInt(resultsPerPageSelect.value);
  currentPage = 1;
  displayResult2();
}

// Écouter les événements sur les boutons de pagination et le select pour changer le nombre de résultats par page
prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
resultsPerPageSelect.addEventListener('change', changeResultsPerPage);


const sortSelect = document.querySelector('#sort-select');

sortSelect.addEventListener('change', () => {
  // Trier les résultats en fonction de l'option de tri sélectionnée
  const sortBy = sortSelect.value;
  console.log(data0)
  data0.sort((a, b) => b[sortBy] - a[sortBy]);
  
  // Afficher les résultats triés
  displayResult2();
});


////////////////////



// Ajouter un événement de clic sur le bouton de recherche
searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  const mediaType = mediaTypeSelect.value;
  search(query, mediaType);
});

