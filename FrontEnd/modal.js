import {displayProjects, removeProjects} from "./projets.js";

const response = await fetch("http://localhost:5678/api/works").then(response => response.json());
const categoriesResponse = await fetch("http://localhost:5678/api/categories").then(response => response.json());
const modal = document.getElementById("modalProjets");
const modal2 = document.getElementById("modalAjouterPhoto");
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close2")[0];
let modalHeader = document.querySelector(".modal-header");
let modalFooter = document.querySelector(".modal-footer");


let ajouterPhoto;
let deleteGallery;

export function modalOpen() {
    firstModal();
    secondModal();
}


export function modalClose() {
    span.onclick = function () {
        modal.style.display = "none";

    }
    span2.onclick = function () {
        modal2.style.display = "none";
    }


}

export function modalCloseOutside() {
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        } else if (event.target === modal2) {
            modal2.style.display = "none";
        }
    }
}


function refreshModalButtons() {
    modalFooter.innerHTML = ""
    ajouterPhoto = document.createElement("button");
    ajouterPhoto.innerText = "Ajouter une photo";
    modalFooter.appendChild(ajouterPhoto);
    deleteGallery = document.createElement("a");
    deleteGallery.innerText = "Supprimer la galerie";
    modalFooter.appendChild(deleteGallery);
}


function createModal() {
    modal.style.display = "block";

    let modalBody = document.querySelector(".modal-body");
    let modalForm = document.querySelector(".img-form");
    let imgModal;
    let editModal;
    let deleteModal;
    let moveModal;

    modalBody.innerHTML = ""

    response.forEach((projet) => {
            modalForm = document.createElement("post");
            modalForm.setAttribute("data-id", projet.id);

            imgModal = document.createElement("img");
            imgModal.src = projet.imageUrl;

            editModal = document.createElement("p");
            editModal.innerText = "éditer";
            deleteModal = document.createElement("i");
            deleteModal.setAttribute("class", "delete-modal");
            deleteModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            let tokenAdmin = sessionStorage.getItem("token");

            moveModal = document.createElement('i');
            moveModal.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
            moveModal.style.visibility = "hidden";

            modalForm.addEventListener("mouseenter", (event) => {
                let currentCard = event.currentTarget;
                let currentMoveModal = currentCard.querySelector('i');
                currentMoveModal.style.visibility = "visible";
            });

            // Ajouter un gestionnaire d'événements mouseleave
            modalForm.addEventListener("mouseleave", (event) => {
                let currentCard = event.currentTarget;
                let currentMoveModal = currentCard.querySelector('i');
                currentMoveModal.style.visibility = "hidden";
            });


            modalBody.appendChild(modalForm);
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

            deleteModal.onclick = function (e) {
                fetch(`http://localhost:5678/api/works/${projet.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenAdmin}`
                    }
                }).then(response => {
                        if (response.ok) {
                            modalForm = e.target.closest('post');
                            modalForm.parentNode.removeChild(modalForm);
                            console.log("c'est delete bg");

                            const galleryProject = document.getElementById(`${projet.id}`);
                            galleryProject.remove();
                            console.log(galleryProject);

                        }
                    }
                )
            }

        }
    );


}

function firstModal() {
    refreshModalButtons();
    createModal();
    console.log("MODAL QUI DOIT OPEN");


}

function secondModal() {

    let backArrow = document.getElementById("back");
    ajouterPhoto.addEventListener("click", function () {

        let modalImgInput;
        let modal2Body;
        let imgInputForm;

        let modal2Footer = document.querySelector(".modal-footer2")
        modal2Footer.innerHTML = "";


        let modal2 = document.getElementById("modalAjouterPhoto");


        let modalImgLabel;
        modalImgLabel = document.createElement("label");
        modalImgLabel.setAttribute("for", "test");
        modalImgLabel.innerHTML = "+ Ajouter Photo";


        let modalImgEmpty;
        modalImgEmpty = document.createElement("i");
        modalImgEmpty.innerHTML = `<i class="fa-sharp fa-regular fa-image"></i>`;
        let modalImgResult = document.createElement("img");
        modalImgResult.setAttribute("id", "blah");
        modalImgResult.style.display = "none";
        modalImgInput = document.createElement("input");
        modalImgInput.setAttribute("type", "file");
        modalImgInput.setAttribute("id", "test");
        modalImgInput.style.display = "none";
        modalImgInput.onchange = () => {
            const [file] = modalImgInput.files;
            if (file) {
                modalImgEmpty.style.display = "none";
                modalImgResult.style.display = "block";
                modalImgLabel.style.display = "none";
                modalImgDesc.style.display = "none";
                blah.src = URL.createObjectURL(file);
                console.log(test.src);
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
        imgTitle.setAttribute("id", "titre-img");

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
        imgCategories.setAttribute("id", "testCate");


        imgCategories.setAttribute("name", "categorie");
        createDefaultOption(imgCategories);
        categoriesResponse.forEach((categorie) => {
            console.log("categorie", categorie);
            imgCategoriesList = document.createElement("option");
            imgCategoriesList.setAttribute("class", "test-cate");
            imgCategoriesList.setAttribute("value", `${categorie.id}`);
            imgCategoriesList.setAttribute("id", `${categorie.id}`);
            imgCategoriesList.innerHTML = `${categorie.name}`
            imgCategories.appendChild(imgCategoriesList);
        })

        imgCategoriesInput.appendChild(imgCategoriesLabel)
        imgCategoriesInput.appendChild(imgCategories);


        modal.style.display = "none";
        modal2.style.display = "block";

        modal2Body.appendChild(imgInputForm);
        modal2Body.appendChild(imgTitleInput);
        modal2Body.appendChild(imgCategoriesInput);

        let modalImgValidButton = document.createElement("button");
        modalImgValidButton.setAttribute("id", "valider-button")
        modalImgValidButton.innerText = "Valider";

        modal2Footer.appendChild(modalImgValidButton)

        modalImgValidButton.addEventListener("click", function () {
            newWork();
        })


    })
    backArrow.onclick = function () {
        modal2.style.display = "none";
        modal.style.display = "block";
    };


}

function createDefaultOption(imgCategories) {
    const imgCategoriesList = document.createElement("option");
    imgCategoriesList.innerHTML = `Selectionner une catégorie`
    imgCategories.appendChild(imgCategoriesList);
}

function newWork() {
    let tok = sessionStorage.getItem("token");

    let testTitle = document.getElementById("titre-img").value;
    let testImg = document.getElementById("test").files[0];
    let testCategory = document.getElementById("testCate").value;

    console.log("title", testTitle);
    console.log("cate", testCategory);
    console.log("img", testImg);

    const formData = new FormData();
    formData.append("image", testImg);
    formData.append("title", testTitle);
    formData.append("category", testCategory);

    console.log("formdata", formData);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tok}`,
        },
        body: formData


    }).then(response => {
        if (response.ok) {
            modal2.style.display = "none";
            response.json().then(newProject => {
                console.log("newProject", newProject);
                displayProjects(newProject, true);
            })
        }


    })

}

