import {displayProjects} from "./projets.js";
import {addProject, deleteProject, getAllProject} from "./services/works-service.js";
import {getAllCategories} from "./services/categories-service.js";


// Récupération des éléments HTML des modales
const modalGallery = document.getElementById("modalProjets");
const modalAjoutPhoto = document.getElementById("modalAjouterPhoto");
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close2")[0];
// Récupération des projets via l'API
const projectRequest = await getAllProject();
// Récupération des catégories via l'API
const categories = await getAllCategories();
// Stockage des projets dans une variable
let projects = [];
projects = projectRequest;


// Stockage des éléments HTML pour le header et le footer de la modale Edit
let modalHeader = document.querySelector(".modal-header");
let modalFooter = document.querySelector(".modal-footer");

// Initialisation des variables pour les boutons d'ajout et suppression de projets
let ajouterPhoto;
let deleteGallery;


// Ouverture des modales
export function modalOpen() {
    firstModal();
    secondModal();
}


// Fermeture des modales via la croix
export function modalClose() {
    span.onclick = function () {
        modalGallery.style.display = "none";
        resetModal();

    }
    span2.onclick = function () {
        modalAjoutPhoto.style.display = "none";
        resetModal();
    }


}


// Fermeture des modales via clic hors modale
export function modalCloseOutside() {
    window.onclick = function (event) {
        if (event.target === modalGallery) {
            modalGallery.style.display = "none";
        } else if (event.target === modalAjoutPhoto) {
            modalAjoutPhoto.style.display = "none";
        }
    }
}

// Pour éviter duplication des boutons
function refreshModalButtons() {
    modalFooter.innerHTML = ""
    ajouterPhoto = document.createElement("button");
    ajouterPhoto.innerText = "Ajouter une photo";
    modalFooter.appendChild(ajouterPhoto);
    deleteGallery = document.createElement("a");
    deleteGallery.innerText = "Supprimer la galerie";
    modalFooter.appendChild(deleteGallery);
    console.log("Refreshed Buttons")
}

// Création de la modale Gallerie
function createModal() {
    modalGallery.style.display = "block";
    resetModal();

    const modalBody = document.querySelector(".modal-body");
    let imgModal;
    let editModal;
    let deleteModal;
    let moveModal;

    modalBody.innerHTML = ""
    console.log('projects', projects)
    // Création de la galerie modale
    projects.forEach((projet) => {
            // Affiche uniquement les projets non deleted

            // Création d'un <post> pour la modale
            let modalForm = document.createElement("post");
            modalForm.setAttribute("data-id", projet.id);

            imgModal = document.createElement("img");
            imgModal.src = projet.imageUrl;

            editModal = document.createElement("p");
            editModal.textContent = "éditer";
            deleteModal = document.createElement("i");
            deleteModal.setAttribute("class", "delete-modal");
            deleteModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

            moveModal = document.createElement('i');
            moveModal.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
            moveModal.style.visibility = "hidden";

            // Apparition du logo déplacement lors du survol
            modalForm.addEventListener("mouseenter", (event) => {
                const currentCard = event.currentTarget;
                const currentMoveModal = currentCard.querySelector('i');
                currentMoveModal.style.visibility = "visible";
            });
            // Disparition du logo déplacement
            modalForm.addEventListener("mouseleave", (event) => {
                const currentCard = event.currentTarget;
                const currentMoveModal = currentCard.querySelector('i');
                currentMoveModal.style.visibility = "hidden";
            });


            modalBody.appendChild(modalForm); // <post> et son contenu assigné au body de la modale
            modalForm.appendChild(imgModal);
            modalForm.appendChild(editModal);
            modalForm.appendChild(moveModal);
            modalForm.appendChild(deleteModal);

            modalBody.style.display = "grid";
            modalBody.style.gridTemplateColumns = "repeat(5, 1fr)";
            modalBody.style.gridTemplateRows = "repeat(5, 1fr)";
            modalBody.style.gridGap = "10px 10px";
            modalBody.style.width = "430px";
            modalBody.style.height = "450px";
            modalBody.style.margin = "46px auto";
            modalBody.style.borderBottom = "1px solid #B3B3B3";

            imgModal.style.width = "78px";
            imgModal.style.height = "104px"

            deleteModal.style.position = "relative";
            deleteModal.style.bottom = "117px";
            deleteModal.style.left = "40px";
            deleteModal.style.fontSize = "9px";
            deleteModal.style.color = "white";
            deleteModal.style.background = "black";
            deleteModal.style.border = "4px solid black";

            moveModal.style.position = "relative";
            moveModal.style.bottom = "117px";
            moveModal.style.left = "36px";
            moveModal.style.fontSize = "9px";
            moveModal.style.color = "white";
            moveModal.style.background = "black";
            moveModal.style.border = "4px solid black";


            // Comportement du logo de suppression de projet
            deleteModal.onclick = async function () {
                projects = await deleteProject(projet.id, projects, modalBody, modalForm)
            }
        }
    );


}

// Reset de la modale à son ouverture et sa fermeture
function resetModal() {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";
}

// Appel de la première modale
function firstModal() {
    refreshModalButtons();
    createModal();
    console.log("Modale édition ouverte");
}

// Création modale d'ajout photo
function secondModal() {

    // Comportement flèche retour en arrière
    let backArrow = document.getElementById("back");
    backArrow.onclick = function () {
        modalAjoutPhoto.style.display = "none";
        modalGallery.style.display = "block";
    };

    // Comportement bouton Ajouter
    ajouterPhoto.addEventListener("click", function () {
        console.log("Modale Ajout ouverte / Modale Edit fermée")

        let modalImgInput;
        let modal2Body;
        let imgInputForm;

        let modal2Footer = document.querySelector(".modal-footer2")
        modal2Footer.innerHTML = "";


        let modal2 = document.getElementById("modalAjouterPhoto");


        let modalImgLabel;
        modalImgLabel = document.createElement("label");
        modalImgLabel.setAttribute("for", "img-project");
        modalImgLabel.innerHTML = "+ Ajouter Photo";

        // Icône visible tant qu'aucune image n'est uploadée
        let modalImgEmpty;
        modalImgEmpty = document.createElement("i");
        modalImgEmpty.innerHTML = `<i class="fa-sharp fa-regular fa-image"></i>`;

        let modalImgResult = document.createElement("img");
        modalImgResult.setAttribute("id", "imgInput");
        modalImgResult.style.display = "none";
        modalImgInput = document.createElement("input");
        modalImgInput.setAttribute("type", "file");
        modalImgInput.setAttribute("required", "");
        modalImgInput.setAttribute("id", "img-project");
        modalImgInput.style.display = "none";
        modalImgInput.onchange = () => {
            const [file] = modalImgInput.files;
            if (file) {
                modalImgEmpty.style.display = "none";
                modalImgResult.style.display = "block";
                modalImgLabel.style.display = "none";
                modalImgDesc.style.display = "none";
                modalImgResult.src = URL.createObjectURL(file);
            }
        }

        let modalImgDesc;
        modalImgDesc = document.createElement("p");
        modalImgDesc.innerText = "jpg, png : 4Mo max"

        modalHeader = document.querySelector(".modal-header");
        modal2Body = document.querySelector(".modal-body2");
        modalFooter = document.querySelector(".modal-footer");
        modal2Body.innerHTML = "";

        imgInputForm = document.createElement("div");
        imgInputForm.setAttribute("class", "image-input");
        imgInputForm.appendChild(modalImgInput);
        imgInputForm.appendChild(modalImgResult);
        imgInputForm.appendChild(modalImgEmpty);
        imgInputForm.appendChild(modalImgLabel);
        imgInputForm.appendChild(modalImgDesc)

        let imgTitleInput;
        let imgTitleLabel;
        let imgTitle;

        imgTitleInput = document.createElement("div");
        imgTitleInput.setAttribute("id", "image-titre");

        imgTitleLabel = document.createElement("label");
        imgTitleLabel.setAttribute("for", "titre");
        imgTitleLabel.innerText = "Titre"

        imgTitle = document.createElement("input");
        imgTitle.setAttribute("name", "titre");
        imgTitle.setAttribute("id", "titre-project");
        imgTitle.setAttribute("required", "");

        imgTitleInput.appendChild(imgTitleLabel)
        imgTitleInput.appendChild(imgTitle);

        let imgCategoriesInput;
        let imgCategoriesLabel
        let imgCategories;
        let imgCategoriesList;


        imgCategoriesInput = document.createElement("div");
        imgCategoriesInput.setAttribute("id", "image-categorie");


        imgCategoriesLabel = document.createElement("label");
        imgCategoriesLabel.setAttribute("for", "categorie");
        imgCategoriesLabel.innerText = "Catégorie"

        imgCategories = document.createElement("select");
        imgCategories.setAttribute("id", "categ-project");
        imgCategories.setAttribute("name", "categorie");
        imgCategories.setAttribute("required", "");
        createDefaultOption(imgCategories);

        // Parcourir les catégories
        categories.forEach((categorie) => {
            console.log("categorie", categorie);
            imgCategoriesList = document.createElement("option");
            imgCategoriesList.setAttribute("class", "test-cate");
            imgCategoriesList.setAttribute("value", `${categorie.id}`);
            imgCategoriesList.setAttribute("id", `${categorie.id}`);
            imgCategoriesList.innerHTML = `${categorie.name}`;
            imgCategories.appendChild(imgCategoriesList);
        })

        imgCategoriesInput.appendChild(imgCategoriesLabel)
        imgCategoriesInput.appendChild(imgCategories);


        modalGallery.style.display = "none";
        modal2.style.display = "block";

        modal2Body.appendChild(imgInputForm);
        modal2Body.appendChild(imgTitleInput);
        modal2Body.appendChild(imgCategoriesInput);

        let modalImgValidButton = document.createElement("button");
        modalImgValidButton.setAttribute("id", "valider-button")
        modalImgValidButton.setAttribute("class", "disabled")
        modalImgValidButton.innerText = "Valider";
        modalImgValidButton.disabled = true;

        modal2Footer.appendChild(modalImgValidButton)
        modalImgValidButton.addEventListener("click", function () {
            newWork();
        })

        imgCategoriesInput.addEventListener("change", function () {
            validateCondition();
        })
        imgTitleInput.addEventListener("keyup", function () {
            validateCondition();
        })
        modalImgInput.addEventListener("change", function () {
            validateCondition();
        })
    })


}

// Création de l'option défaut du dropdown
function createDefaultOption(imgCategories) {
    const imgCategoriesList = document.createElement("option");
    imgCategoriesList.innerHTML = `Selectionner une catégorie`
    imgCategories.appendChild(imgCategoriesList);
}

// Envoi d'un nouveau projet
function newWork() {
    let tok = sessionStorage.getItem("token");

    let titleProject = document.getElementById("titre-project").value;
    let imgProject = document.getElementById("img-project").files[0];
    let categProject = document.getElementById("categ-project").value;

    console.log("title", titleProject);
    console.log("cate", categProject);
    console.log("img", imgProject);

    const formData = new FormData();
    formData.append("image", imgProject);
    formData.append("title", titleProject);
    formData.append("category", categProject);

    console.log("formdata", formData);

    addProject(formData).then(response => {
        if (response.ok) {
            modalAjoutPhoto.style.display = "none";
            console.log("Nouveau projet ajouté")
            response.json().then(newProject => {
                console.log("newProject", newProject);
                projects.push(newProject)
                displayProjects(newProject, true);
            })
        }
    })
        .catch((error) => {
            console.error("Error : ", error);
            errorMessage.textContent = "Une erreur est survenue";
        });

}

// Condition pour que le bouton Valider soit cliquable
function validateCondition() {
    const titreInput = document.getElementById("titre-project");
    const cateInput = document.getElementById("categ-project");
    const imgInput = document.getElementById("img-project");
    const validButton = document.getElementById("valider-button");
    if (titreInput?.value && cateInput?.value > 0 && imgInput?.files.length > 0) {
        validButton.disabled = false;
        validButton.classList.add("enabled");
        validButton.classList.remove("disabled");
    } else {
        validButton.disabled = true;
        validButton.classList.remove("enabled");
    }
}

