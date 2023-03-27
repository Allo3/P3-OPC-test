const reponse = await fetch("http://localhost:5678/api/works").then(reponse => reponse.json());

const modal = document.getElementById("modalProjets");
const modalBouton = document.getElementById("modifier2");
const span = document.getElementsByClassName("close")[0];

export function modalOpen() {
    let modal;
    let modalBouton;

    modal = document.getElementById("modalProjets");
    modalBouton = document.getElementById("modifier2");
    modalBouton.onclick = function () {
        modal.style.display = "block";
        let modalBody = document.querySelector(".modal-body");
        let imgModal;
        reponse.forEach((projet) => {
            imgModal = document.createElement("img");
            imgModal.src = projet.imageUrl;
            modalBody.appendChild(imgModal);
            imgModal.style.width = "78px";
            imgModal.style.height = "104px"
            modalBody.style.display = "flex";
            modalBody.style.flexWrap = "wrap";
            modalBody.style.width = "60%";
            modalBody.style.margin = "auto";
            modalBody.style.justifyContent = "space-evenly";
        });
    }
    console.log(modal);
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