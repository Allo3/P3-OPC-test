const reponse = await fetch("http://localhost:5678/api/works").then(reponse => reponse.json());

const modal = document.getElementById("modalProjets");
const modalBouton = document.getElementById("modifier2");
const span = document.getElementsByClassName("close")[0];

let modalFooter = document.querySelector(".modal-footer");
let ajouterPhoto;

export function modalOpen() {
    let modal;
    let modalBouton;
    refreshModalButton();
    modal = document.getElementById("modalProjets");
    modalBouton = document.getElementById("modifier2");
    modalBouton.onclick = function () {
        modal.style.display = "block";
        let modalBody = document.querySelector(".modal-body");
        let modalForm = document.querySelector(".img-form")
        let imgModal;
        let editerModal;
        reponse.forEach((projet) => {
            modalForm = document.createElement("post");
            imgModal = document.createElement("img");
            imgModal.src = projet.imageUrl;
            editerModal = document.createElement("button");
            editerModal.innerText = "éditer";

            modalBody.appendChild(modalForm);
            modalForm.appendChild(imgModal);
            modalForm.appendChild(editerModal);

            imgModal.style.width = "78px";
            imgModal.style.height = "104px"

            modalBody.style.display = "grid";
            modalBody.style.gridTemplateColumns = "repeat(5, 1fr)";
            modalBody.style.gridTemplateRows = "repeat(5, 1fr)";
            modalBody.style.gridGap = "10px 10px";
            modalBody.style.width = "430px";
            modalBody.style.height = "450px";
            modalBody.style.margin = "46px auto";
            modalBody.style.borderBottom = "1px solid #B3B3B3";
        });

        let deleteGallery = document.createElement("a");
        deleteGallery.innerText = "Supprimer la galerie";
        modalFooter.appendChild(deleteGallery);
    }
}

export function modalClose() {
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        removeModalImg();
        modal.style.display = "none";
    }

}

export function modalCloseOutside() {
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            removeModalImg();
            modal.style.display = "none";
        }
    }
}

function removeModalImg() {
    const listModal = document.querySelector(".modal-body");
    while (listModal.children.length > 0) {
        listModal.removeChild(listModal.firstElementChild);
    }
}

function refreshModalButton() {
    deleteModalButton();
    ajouterPhoto = document.createElement("button");
    ajouterPhoto.innerText = "Ajouter une photo";
    modalFooter.appendChild(ajouterPhoto);
}

function deleteModalButton() {
    const buttonModal = document.querySelector(".modal-footer");
    buttonModal;
}