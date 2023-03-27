import { modalOpen, modalClose, modalCloseOutside } from "./modal.js";
// Récupération des Posts via l'API
const projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());

let divGallery = document.querySelector("#gallery");

const allBouton = document.getElementById('all');
allBouton.addEventListener("click", () => {
    removeProjects();
    displayProjects(projets);
})
const objetsBouton = document.getElementById('objets');
objetsBouton.addEventListener("click", () => {
    removeProjects();
    displayProjects(projets.filter((projet) => projet.categoryId === 1));
})
const appartBouton = document.getElementById('appart');
appartBouton.addEventListener("click", () => {
    removeProjects();
    displayProjects(projets.filter((projet) => projet.categoryId === 2));
})
const hotelRestaurantBouton = document.getElementById('hotel-resto');
hotelRestaurantBouton.addEventListener("click", () => {
    removeProjects();
    displayProjects(projets.filter((projet) => projet.categoryId === 3));
})

function displayProjects(projets) {
    let postProjet;
    let figureProjet;
    let imgProjet;
    let figCaptionProjet;
    projets.forEach((projet) => {
        postProjet = document.createElement("post");
        figureProjet = document.createElement("figure");
        figureProjet.setAttribute("id", `Post - ${projet.id}`);
        imgProjet = document.createElement("img");
        imgProjet.src = projet.imageUrl;
        figCaptionProjet = document.createElement("figcaption");
        figCaptionProjet.innerText = projet.title;

        postProjet.appendChild(figureProjet);
        postProjet.appendChild(imgProjet);
        postProjet.appendChild(figCaptionProjet);
        divGallery.appendChild(postProjet);
    });

}

function removeProjects() {

    const list = document.getElementById("gallery");
    while (list.children.length > 0) {
        list.removeChild(list.firstElementChild);
    }
}

displayProjects(projets);

function logout() {
    const logoutBouton = document.getElementById("login");
    logoutBouton.addEventListener("click", (event) => {
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

    modalOpen();
    modalClose();
    modalCloseOutside();

    logout();

};




console.log(sessionStorage.userId, sessionStorage.token);