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






