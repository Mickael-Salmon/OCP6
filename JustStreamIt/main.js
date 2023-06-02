// Définit l'URL principale de l'API
const mainUrl = "http://localhost:8000/api/v1/titles/"

// Récupère et affiche le meilleur film
async function fetchBestMovie() {
    // Récupère le film avec le meilleur score IMDb
    const response = await fetch(mainUrl + "?sort_by=-imdb_score");
    const data = await response.json();
    const bestMovie = data["results"][0];
    // Récupère les détails du meilleur film
    const bestMovieDetails = await fetch(bestMovie["url"]).then(res => res.json());

    // Affiche les informations du meilleur film
    displayBestMovie(bestMovie, bestMovieDetails);
}

// Affiche le meilleur film dans le DOM
function displayBestMovie(movie, details) {
    // Récupère et met à jour les éléments du DOM pour le meilleur film
    const bestTitle = document.getElementById('top-title');
    const bestImg = document.querySelector('.best-cover img');
    const bestDesc = document.querySelector('.best-desc');
    const bestButton = document.querySelectorAll('.button')[1];

    // Met à jour les informations du meilleur film
    bestTitle.innerHTML = movie["title"];
    bestImg.src = movie["image_url"];
    bestButton.setAttribute("onclick", `openModal("${movie["id"]}")`);
    bestDesc.innerHTML = details["description"];
}

// Ouvre une modale avec les détails du film
async function openModal(id) {
    // Récupère les éléments du DOM pour la modale
    const modal = document.getElementById("modal");
    const span = document.querySelector(".close");

    // Récupère et affiche les données dans la modale
    await fetchModalData(id);

    // Affiche la modale et ajoute les gestionnaires d'événements pour la fermer
    modal.style.display = "block";
    span.onclick = () => modal.style.display = "none";
    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Récupère les données de la modale et les affiche
function fetchModalData(id) {
    // Récupère les détails du film
    fetch(mainUrl + id)
        .then(response => response.json())
        .then(data => {
            // Met à jour les éléments du DOM avec les données du film
            document.getElementById('modal-cover').src = data["image_url"];
            document.getElementById('modal-title').innerHTML = data["title"];

            document.getElementById('modal-year').innerHTML = data["year"];
            document.getElementById('modal-duration').innerHTML = data["duration"] + " min";
            document.getElementById('modal-genres').innerHTML = data["genres"];
            document.getElementById('modal-imdb').innerHTML = data["imdb_score"] + " / 10";

            document.getElementById('modal-directors').innerHTML = data["directors"];
            document.getElementById('modal-cast').innerHTML = data["actors"] + "...";
            document.getElementById('modal-country').innerHTML = data["countries"];

            // Traite les informations de classification et de box-office
            if (typeof data["rated"] === 'string' || data["rated"] instanceof String)
                document.getElementById('modal-rating').innerHTML = data["rated"];
            else
                document.getElementById('modal-rating').innerHTML = data["rated"] + "+";  // ajoute "+" si la classification est un nombre

            let modalBoxOffice = document.getElementById('modal-box-office');
            if (data["worldwide_gross_income"] == null)
            modalBoxOffice.innerHTML = "N/A";  // affiche "N/A" si les informations sur le box-office ne sont pas disponibles
        else
            modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];

        let regExp = /[a-zA-Z]/g;
        if (regExp.test(data["long_description"]))
            document.getElementById('modal-desc').innerHTML = data["long_description"];
        else
            document.getElementById('modal-desc').innerHTML = "N/A";  // affiche "N/A" si la description est manquante
    })
}

// Récupère les films d'une catégorie spécifique
async function fetchCategories(name, skip, total = 18) {
// Récupère les films en fonction du genre et du classement IMDb
const results = await fetch(mainUrl + "?sort_by=-imdb_score&genre=" + name);

if (!results.ok)
    return
const data = await results.json();
let moviesData = Array(...data.results);

// Supprime les films en fonction de la valeur 'skip'
if (skip > 0)
    moviesData.splice(0, skip);

// Récupère les films supplémentaires si nécessaire
if (moviesData.length < total) {
    let results2 = await (await fetch(data.next)).json();
    moviesData.push(...Array(...results2.results).slice(0, total - moviesData.length));
}

return moviesData;
}


// Contrôle du défilement du carrousel vers la gauche
function moveCarouselLeft(category) {
// Met à jour la position et l'affichage des boutons du carrousel
let carrouselContent = document.querySelector("#" + category + "-movies");
let carrouselLeftBtn = document.querySelector("#" + category + "-left");
let carrouselRightBtn = document.querySelector("#" + category + "-right");

carrouselContent.style.left = "-680px";
carrouselRightBtn.classList.remove("show");
carrouselLeftBtn.classList.add("show");
}

// Contrôle du défilement du carrousel vers la droite
function moveCarouselRight(category) {
// Met à jour la position et l'affichage des boutons du carrousel
let carrouselContent = document.querySelector("#" + category + "-movies");
let carrouselLeftBtn = document.querySelector("#" + category + "-left");
let carrouselRightBtn = document.querySelector("#" + category + "-right");

carrouselContent.style.left = "0px";
carrouselRightBtn.classList.add("show");
carrouselLeftBtn.classList.remove("show");
}

// Construit le carrousel pour une catégorie spécifique
async function buildCarousel(category, name, skip = 0) {
// Crée les éléments du DOM pour le carrousel
let cat_name = name;
if (name === "best")
    cat_name = "";

const section = document.createElement("section")
section.classList.add("categories")

const carousel = document.createElement('div');
carousel.classList.add('container');

const categoryTitle = document.createElement('h2');
categoryTitle.innerHTML = `${category} movies`;
carousel.append(categoryTitle);

const carouselContainer = document.createElement('div');
carouselContainer.classList.add('carousel-container');

const carouselContent = document.createElement('div');
carouselContent.classList.add('carousel-content');
carouselContent.setAttribute("id", `${name}-movies`)

document.querySelector('.carousels').appendChild(section);

// Récupère les films pour la catégorie
const movies = await fetchCategories(cat_name, skip);

// Crée et ajoute les éléments du DOM pour chaque film du carrousel
let i = 0;
for (const movie of movies) {
    const box = document.createElement('div');
    box.classList.add("box");
    box.setAttribute("id", `${cat_name}${i + 1}`);

    const movieCover = document.createElement("img");
    movieCover.setAttribute("alt", movie.title);
    movieCover.src = movie.image_url;
    box.appendChild(movieCover);

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const movieTitle = document.createElement("p");
    movieTitle.innerHTML = movie.title;
    overlay.appendChild(movieTitle);

    const playButton = document.createElement("button");
    playButton.classList.add("overlay-button");
    playButton.innerHTML = '<i class="bi bi-play-fill"></i> Play';
    overlay.appendChild(playButton);

    const modalButton = document.createElement("button");
    modalButton.classList.add("overlay-button");
    modalButton.setAttribute("onclick", `openModal("${movie.id}")`);
    modalButton.innerHTML = "More...";
    overlay.appendChild(modalButton);

    box.appendChild(overlay);
    carouselContent.appendChild(box);

    i++;
}

// Crée et ajoute les contrôles de défilement du carrousel
const controls = document.createElement("div");
controls.classList.add("controls");

const leftButton = document.createElement('button');
leftButton.classList.add('btn');
leftButton.classList.add('left');
leftButton.setAttribute('aria-label', `${name} slide left`);
leftButton.setAttribute('id', `${name}-left`);
leftButton.setAttribute('onclick', `moveCarouselRight("${name}")`);
leftButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
controls.appendChild(leftButton);

const rightButton = document.createElement('button');
rightButton.classList.add('btn');
rightButton.classList.add('right');
rightButton.classList.add('show');
rightButton.setAttribute('id', `${name}-right`);
rightButton.setAttribute('aria-label', `${name} slide right`);
rightButton.setAttribute('onclick', `moveCarouselLeft("${name}")`);
rightButton.innerHTML = '<i class="bi bi-chevron-right"></i>';
controls.appendChild(rightButton);

carouselContainer.appendChild(carouselContent);
carouselContainer.appendChild(controls);

carousel.appendChild(carouselContainer);
section.appendChild(carousel);
}

// Initialise les carrousels et récupère le meilleur film au chargement de la page
window.addEventListener('load', async () => {
await buildCarousel("Best-rated", "best", 1);
await buildCarousel("Romance", "romance");
await buildCarousel("Sci-Fi", "sci-fi");
await buildCarousel("Mystery", "mystery");

await fetchBestMovie();
});


