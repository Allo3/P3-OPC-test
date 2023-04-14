import {displayProjects as e, removeProjects as t} from "./projets.js";

let response = await fetch("http://localhost:5678/api/works").then(e => e.json()),
    categoriesResponse = await fetch("http://localhost:5678/api/categories").then(e => e.json()),
    modal = document.getElementById("modalProjets"), modal2 = document.getElementById("modalAjouterPhoto"),
    span = document.getElementsByClassName("close")[0], span2 = document.getElementsByClassName("close2")[0],
    modalHeader = document.querySelector(".modal-header"), modalFooter = document.querySelector(".modal-footer"),
    ajouterPhoto, deleteGallery;

export function modalOpen() {
    firstModal(), secondModal()
}

export function modalClose() {
    span.onclick = function () {
        modal.style.display = "none"
    }, span2.onclick = function () {
        modal2.style.display = "none"
    }
}

export function modalCloseOutside() {
    window.onclick = function (e) {
        e.target === modal ? modal.style.display = "none" : e.target === modal2 && (modal2.style.display = "none")
    }
}

function refreshModalButtons() {
    modalFooter.innerHTML = "", (ajouterPhoto = document.createElement("button")).innerText = "Ajouter une photo", modalFooter.appendChild(ajouterPhoto), (deleteGallery = document.createElement("a")).innerText = "Supprimer la galerie", modalFooter.appendChild(deleteGallery)
}

function createModal() {
    modal.style.display = "block";
    let e = document.querySelector(".modal-body"), t = document.querySelector(".img-form"), l, o, a, i;
    e.innerHTML = "", response.forEach(n => {
        (t = document.createElement("post")).setAttribute("data-id", n.id), (l = document.createElement("img")).src = n.imageUrl, (o = document.createElement("p")).innerText = "\xe9diter", (a = document.createElement("i")).setAttribute("class", "delete-modal"), a.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        let r = sessionStorage.getItem("token");
        (i = document.createElement("i")).innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>', i.style.visibility = "hidden", t.addEventListener("mouseenter", e => {
            e.currentTarget.querySelector("i").style.visibility = "visible"
        }), t.addEventListener("mouseleave", e => {
            e.currentTarget.querySelector("i").style.visibility = "hidden"
        }), e.appendChild(t), t.appendChild(l), t.appendChild(o), t.appendChild(i), t.appendChild(a), e.style.display = "grid", e.style.gridTemplateColumns = "repeat(5, 1fr)", e.style.gridTemplateRows = "repeat(5, 1fr)", e.style.gridGap = "10px 10px", e.style.width = "430px", e.style.height = "450px", e.style.margin = "46px auto", e.style.borderBottom = "1px solid #B3B3B3", l.style.width = "78px", l.style.height = "104px", a.style.position = "relative", a.style.bottom = "117px", a.style.left = "40px", a.style.fontSize = "9px", a.style.color = "white", a.style.background = "black", a.style.border = "4px solid black", i.style.position = "relative", i.style.bottom = "117px", i.style.left = "36px", i.style.fontSize = "9px", i.style.color = "white", i.style.background = "black", i.style.border = "4px solid black", a.onclick = function (e) {
            fetch(`http://localhost:5678/api/works/${n.id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${r}`}
            }).then(l => {
                if (l.ok) {
                    (t = e.target.closest("post")).parentNode.removeChild(t), console.log("c'est delete bg");
                    let o = document.getElementById(`${n.id}`);
                    o.remove(), console.log(o)
                }
            })
        }
    })
}

function firstModal() {
    refreshModalButtons(), createModal(), console.log("MODAL QUI DOIT OPEN")
}

function secondModal() {
    let e = document.getElementById("back");
    ajouterPhoto.addEventListener("click", function () {
        let e, t, l, o = document.querySelector(".modal-footer2");
        o.innerHTML = "";
        let a = document.getElementById("modalAjouterPhoto"), i;
        (i = document.createElement("label")).setAttribute("for", "test"), i.innerHTML = "+ Ajouter Photo";
        let n;
        (n = document.createElement("i")).innerHTML = '<i class="fa-sharp fa-regular fa-image"></i>';
        let r = document.createElement("img");
        r.setAttribute("id", "blah"), r.style.display = "none", (e = document.createElement("input")).setAttribute("type", "file"), e.setAttribute("id", "test"), e.style.display = "none", e.onchange = () => {
            let [t] = e.files;
            t && (n.style.display = "none", r.style.display = "block", i.style.display = "none", d.style.display = "none", blah.src = URL.createObjectURL(t), console.log(test.src))
        };
        let d;
        (d = document.createElement("p")).innerText = "jpg, png : 4Mo max", modalHeader = document.querySelector(".modal-header"), t = document.querySelector(".modal-body2"), modalFooter = document.querySelector(".modal-footer"), t.innerHTML = "", (l = document.createElement("div")).setAttribute("class", "image-input"), l.appendChild(e), l.appendChild(r), l.appendChild(n), l.appendChild(i), l.appendChild(d);
        let s, p, c;
        (s = document.createElement("div")).setAttribute("id", "image-titre"), (p = document.createElement("label")).setAttribute("for", "titre"), p.innerText = "Titre", (c = document.createElement("input")).setAttribute("name", "titre"), c.setAttribute("id", "titre-img"), s.appendChild(p), s.appendChild(c);
        let m, y, u, h;
        (m = document.createElement("div")).setAttribute("id", "image-categorie"), (y = document.createElement("label")).setAttribute("for", "categorie"), y.innerText = "Cat\xe9gorie", (u = document.createElement("select")).setAttribute("id", "testCate"), u.setAttribute("name", "categorie"), createDefaultOption(u), categoriesResponse.forEach(e => {
            console.log("categorie", e), (h = document.createElement("option")).setAttribute("class", "test-cate"), h.setAttribute("value", `${e.id}`), h.setAttribute("id", `${e.id}`), h.innerHTML = `${e.name}`, u.appendChild(h)
        }), m.appendChild(y), m.appendChild(u), modal.style.display = "none", a.style.display = "block", t.appendChild(l), t.appendChild(s), t.appendChild(m);
        let g = document.createElement("button");
        g.setAttribute("id", "valider-button"), g.innerText = "Valider", o.appendChild(g), g.addEventListener("click", function () {
            newWork()
        })
    }), e.onclick = function () {
        modal2.style.display = "none", modal.style.display = "block"
    }
}

function createDefaultOption(e) {
    let t = document.createElement("option");
    t.innerHTML = `Selectionner une cat\xe9gorie`, e.appendChild(t)
}

function newWork() {
    let t = sessionStorage.getItem("token"), l = document.getElementById("titre-img").value,
        o = document.getElementById("test").files[0], a = document.getElementById("testCate").value;
    console.log("title", l), console.log("cate", a), console.log("img", o);
    let i = new FormData;
    i.append("image", o), i.append("title", l), i.append("category", a), console.log("formdata", i), fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {accept: "application/json", Authorization: `Bearer ${t}`},
        body: i
    }).then(t => {
        t.ok && (modal2.style.display = "none", t.json().then(t => {
            console.log("newProject", t), e(t, !0)
        }))
    })
}