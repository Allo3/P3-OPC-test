import {modalClose, modalCloseOutside, modalOpen} from "./modal.js";
// Récupération des Posts via l'API
const response = await fetch("http://localhost:5678/api/works").then(response => response.json()).then(data => Object.values(data));

let divGallery = document.querySelector("#gallery");

const allButton = document.getElementById('all');
allButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response);
})
const objetsButton = document.getElementById('objets');
objetsButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 1));
})
const apartButton = document.getElementById('appart');
apartButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 2));
})
const hotelRestaurantButton = document.getElementById('hotel-resto');
hotelRestaurantButton.addEventListener("click", () => {
    removeProjects();
    displayProjects(response.filter((projet) => projet.categoryId === 3));
})



export function displayProjects(response, update = false) {
    console.log('response function', response)
    if(!update){
        response.forEach((projet) => {
            createElement(projet)
        });
    }else{
        createElement(response)
    }



}

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

export function removeProjects() {

    const list = document.getElementById("gallery");
    while (list.children.length > 0) {
        list.removeChild(list.firstElementChild);
    }
}

displayProjects(response);

function logout() {
    console.log("token", sessionStorage.token);
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
        console.log("TEST");
        modalOpen();
        modalClose();
        modalCloseOutside();
    }

    logout();

}




