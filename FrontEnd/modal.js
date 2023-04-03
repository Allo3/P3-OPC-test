const reponse = await fetch("http://localhost:5678/api/works").then(reponse => reponse.json());
const categorieResponse = await fetch("http://localhost:5678/api/categories").then(reponse => reponse.json());
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
        removeModalImg();
        modal.style.display = "none";

    }
    span2.onclick = function () {
        modal2.style.display = "none";
    }


}

export function modalCloseOutside() {
    window.onclick = function (event) {
        if (event.target == modal) {
            removeModalImg();
            modal.style.display = "none";
        } else if (event.target == modalAjouterPhoto) {
            modal2.style.display = "none";
        }
    }
}

function removeModalImg() {
    const listModal = document.querySelector(".modal-body");
    while (listModal.children.length > 0) {
        listModal.removeChild(listModal.firstElementChild);
    }

}

function refreshModalButtons() {
    ajouterPhoto = document.createElement("button");
    ajouterPhoto.innerText = "Ajouter une photo";
    modalFooter.appendChild(ajouterPhoto);
    deleteGallery = document.createElement("a");
    deleteGallery.innerText = "Supprimer la galerie";
    modalFooter.appendChild(deleteGallery);
}

function firstModal() {
    let modal;
    let modalBouton;
    refreshModalButtons();
    modal = document.getElementById("modalProjets");
    modalBouton = document.getElementById("modifier2");
    modalBouton.onclick = function () {
        modal.style.display = "block";
        let modalBody = document.querySelector(".modal-body");
        let modalForm = document.querySelector(".img-form")
        let imgModal;
        let editerModal;
        let deleteModal;
        let moveModal;
        modalBody.innerHTML = "";

        reponse.forEach((projet) => {
            modalForm = document.createElement("post");

            imgModal = document.createElement("img");
            imgModal.src = projet.imageUrl;

            editerModal = document.createElement("p");
            editerModal.innerText = "éditer";
            deleteModal = document.createElement("i");
            deleteModal.setAttribute("class", "delete-modal");
            deleteModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            let tokenAdmin = sessionStorage.getItem("token");
            deleteModal.onclick = function (e) {
                e.preventDefault();
                fetch(`http://localhost:5678/api/works/${projet.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenAdmin}`
                    }
                })
                console.log("token", sessionStorage.token);
                console.log("token", tokenAdmin);
                console.log("ID projet", projet.id);
                console.log(window.sessionStorage.token);

            }

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
            modalForm.appendChild(editerModal);
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
        });

    }

}

function secondModal() {

    let backArrow = document.getElementById("back");
    ajouterPhoto.addEventListener("click", function (projet) {

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
        modalImgInput.onchange = evt => {
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

        let imgCategorieInput;
        let imgCategorieLabel
        let imgCategorie;
        let imgCategorieList;


        imgCategorieInput = document.createElement("div");
        imgCategorieInput.setAttribute("id", "image-categorie");


        imgCategorieLabel = document.createElement("label");
        imgCategorieLabel.setAttribute("for", "categorie");
        imgCategorieLabel.innerText = "Catégorie"

        imgCategorie = document.createElement("select");
        imgCategorie.setAttribute("id", "testCate");


        imgCategorie.setAttribute("name", "categorie");
        createDefaultOption(imgCategorie);
        categorieResponse.forEach((categorie) => {
            console.log("categorie", categorie);
            imgCategorieList = document.createElement("option");
            imgCategorieList.setAttribute("class", "test-cate");
            imgCategorieList.setAttribute("value", `${categorie.id}`);
            imgCategorieList.setAttribute("id", `${categorie.id}`);
            imgCategorieList.innerHTML = `${categorie.name}`
            imgCategorie.appendChild(imgCategorieList);
        })

        imgCategorieInput.appendChild(imgCategorieLabel)
        imgCategorieInput.appendChild(imgCategorie);


        modal.style.display = "none";
        modal2.style.display = "block";

        modal2Body.appendChild(imgInputForm);
        modal2Body.appendChild(imgTitleInput);
        modal2Body.appendChild(imgCategorieInput);

        let modalImgValiderButton = document.createElement("button");
        modalImgValiderButton.setAttribute("id", "valider-button")
        modalImgValiderButton.innerText = "Valider";
   

        modalImgValiderButton.addEventListener("click", function (event) {
            event.preventDefault();

            newWork();
        })

        modal2Footer.appendChild(modalImgValiderButton)





    })
    backArrow.onclick = function () {
        modal2.style.display = "none";
        modal.style.display = "block";
    };



}

function createDefaultOption(imgCategorie) {
    const imgCategorieList = document.createElement("option");
    imgCategorieList.innerHTML = `Séléctionner une catégorie`
    imgCategorie.appendChild(imgCategorieList);
}

function newWork(e) { 
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

    })
}
