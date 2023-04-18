import {modalClose, modalCloseOutside, modalOpen} from "./modal.js";
import {getAllProject} from "./services/works-service.js";

// Récupération des Posts via l'API
const response = await getAllProject();
console.log('response', response);
// Stockage de la galerie dans une variable
let divGallery = document.querySelector("#gallery");

// Comportement du filtre Tous
const allButton = document.getElementById('all');
allButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response);
})

// Comportement du filtre Objets
const objetsButton = document.getElementById('objets');
objetsButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 1));
})

// Comportement du filtre Appartements
const apartButton = document.getElementById('appart');
apartButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 2));
})

// Comportement du filtre Hôtels et Restaurants
const hotelRestaurantButton = document.getElementById('hotel-resto');
hotelRestaurantButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 3));
})


// Affichage des projets
export function displayProjects(response, update = false) {
    console.log('response projets', response)
    if(!update){
        response.forEach((projet) => {
            createElement(projet)
        });
    }else{
        createElement(response)
    }
}

// Création des <post> projets
function createElement(project) {
    let postProjet;
    let figureProjet;
    let imgProjet;
    let figCaptionProjet;

    postProjet = document.createElement("post");
    postProjet.setAttribute("class", "post-projet")
    figureProjet = document.createElement("figure");
    postProjet.setAttribute("id", `${project.id}`);
    imgProjet = document.createElement("img");
    imgProjet.width = 150;
    imgProjet.height = 519;
    imgProjet.style.objectFit = "cover"
    imgProjet.src = project.imageUrl;
    figCaptionProjet = document.createElement("figcaption");
    figCaptionProjet.innerText = project.title;

    postProjet.appendChild(figureProjet);
    postProjet.appendChild(imgProjet);
    postProjet.appendChild(figCaptionProjet);
    divGallery.appendChild(postProjet);
}


// Fonction de suppression de projets pour filtres
export function removeProjects() {

    const list = document.getElementById("gallery");
    while (list.children.length > 0) {
        list.removeChild(list.firstElementChild);
    }
}

displayProjects(response);


// Comportement du bouton Logout
function logout() {
    console.log("Admin connecté");
    const logoutButton = document.getElementById("login");
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.clear();
        window.location.reload();
    });
}

if (sessionStorage.userId && sessionStorage.token !== null) {
    let logoutLink = document.getElementById("login");
    logoutLink.innerHTML = "logout";
    logoutLink.style.fontWeight = "600";

    let introAdmin;
    let projetsAdmin;
    let editMode;
    let navbarEditText;
    let navbarEdit;
    let modifier1;
    let modifier2;
    introAdmin = document.querySelector("#img-intro");
    projetsAdmin = document.getElementById("projets-title");
    editMode = document.querySelector("#edit-Admin");
    navbarEditText = document.createElement("p");
    navbarEdit = document.createElement("button");
    modifier1 = document.createElement("button");
    modifier2 = document.createElement("button");

    editMode.style.display = "flex"
    editMode.style.visibility = "visible";
    modifier1.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> ` + " modifier";
    introAdmin.appendChild(modifier1);
    modifier2.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> ` + " modifier";
    modifier2.setAttribute("id", "modifier2");
    projetsAdmin.appendChild(modifier2);

    navbarEditText.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> ` + " Mode édition";
    navbarEdit.innerText = "publier les changements";
    editMode.appendChild(navbarEditText);
    editMode.appendChild(navbarEdit);

    let filtres = document.querySelector(".filtres");
    filtres.style.visibility = "hidden";

    const modalButton = document.getElementById("modifier2");
    modalButton.onclick = function () {
        modalOpen();
        modalClose();
        modalCloseOutside();
    }

    logout();

}




