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


const anime = 'https://api.themoviedb.org/3/3/genre/animation/700/lists?api_key=${81e1b94cd27c6a6afba6ebacbb80d97e}&query=${query}';

fetch(anime)
// Récupération de la réponse au format JSON
.then(response => response.json())
.then(data => {
    for (let i = 0; i < data.results.length; i++) {
        let dataDivContent = document.createElement('div');
        dataDivContent.classList.add('content')
        body.appendChild(dataDivContent);

        let dataDivCard = document.createElement('div');
        dataDivCard.classList.add('card');
        dataDivContent.appendChild(dataDivCard);

        let dataDivFront = document.createElement('div');
        dataDivFront.classList.add('front');
        dataDivCard.appendChild(dataDivFront);
        dataDivFront.style.backgroundImage = url("https://image.tmdb.org/t/p/original${data.results[i].poster_path}");

        let dataDivBack = document.createElement('div');
        dataDivBack.classList.add('back');
        dataDivCard.appendChild(dataDivBack);
        dataDivBack.style.backgroundImage = url("https://image.tmdb.org/t/p/original${data.results[i].poster_path}")

        let dataDiv = document.createElement('div');
        dataDivBack.appendChild(dataDiv);

        let dataMovieTitle = document.createElement('h2');
        dataDiv.appendChild(dataMovieTitle);
        dataMovieTitle.innerHTML = data.results[i].title;

        let dataMovieOverview = document.createElement('p');
        dataDiv.appendChild(dataMovieOverview);
        dataMovieOverview.innerHTML = data.results[i].overview;
    }
    console.log(data.results);
    for(i=0; i < data.results[0].genre_ids.length; i++) {
        getMovieGenre(data.results[0].genre_ids[i]);
    }
})
// Gestion des erreurs éventuelles
.catch(error => console.error(error));
