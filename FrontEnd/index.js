
/* Fonction fetch pour récuperer toutes les data depuis l'API */
async function getWorks() {
    let rep = await fetch("http://localhost:5678/api/works");
    let reponse = await rep.json();
    return reponse;
};

/* Fonction pour créer chaque Card de chaque élément récuper de l'API*/
async function generateCard() {

    let allWork = await getWorks("http://localhost:5678/api/works")

    for (let i = 0; i < allWork.length; i++) {

        const itemCard = document.getElementById('gallery');

        itemCard.innerHTML += `

            <figure class="card-gallery">
                <img crossorigin="anonymous" src="${allWork[i].imageUrl}" alt="${allWork[i].title}" />
                <figcaption>${allWork[i].title}</figcaption>
            </figure>`;
    };
};

/* Fonction qui trie les éléments par catégorie et qui réaffiche les cards triées */
async function categoriesFiltred(categorie = "") {

    let allWork = await getWorks("http://localhost:5678/api/works")
    const itemCard = document.getElementById('gallery');
    itemCard.innerHTML = "";
    if (!categorie) {
        return generateCard();
    }
    if (categorie === "Objets") {
        let dataFiltred = allWork.filter(function (data) {
            return data.category.name == "Objets";
        });
        console.log(dataFiltred);
        for (let i = 0; i <= dataFiltred.length; i++) {
            itemCard.innerHTML += `
    
                <figure class="card-gallery">
                    <img crossorigin="anonymous" src="${dataFiltred[i].imageUrl}" alt="${dataFiltred[i].title}" />
                    <figcaption>${dataFiltred[i].title}</figcaption>
                </figure>`
        }
    } if (categorie === "Appartements") {
        let dataFiltred = allWork.filter(function (data) {
            return data.category.name == "Appartements";
        });
        console.log(dataFiltred);
        for (let i = 0; i <= dataFiltred.length; i++) {
            itemCard.innerHTML += `
    
                <figure class="card-gallery">
                    <img crossorigin="anonymous" src="${dataFiltred[i].imageUrl}" alt="${dataFiltred[i].title}" />
                    <figcaption>${dataFiltred[i].title}</figcaption>
                </figure>`
        }
    } if (categorie === "Hotels & restaurants") {
        let dataFiltred = allWork.filter(function (data) {
            return data.category.name == "Hotels & restaurants";
        });
        console.log(dataFiltred);
        for (let i = 0; i <= dataFiltred.length; i++) {
            itemCard.innerHTML += `
    
                <figure class="card-gallery">
                    <img crossorigin="anonymous" src="${dataFiltred[i].imageUrl}" alt="${dataFiltred[i].title}" />
                    <figcaption>${dataFiltred[i].title}</figcaption>
                </figure>`
        }
    }
    else {

        itemCard.innerHTML += `Desole la categorie selectionee n'existe pas`
    }
}


generateCard();
categoriesFiltred();

/* Appel des différents bouton*/
const filtreTous = document.querySelector(".btn-filter1")
filtreTous.addEventListener("click", () => {
    categoriesFiltred("");
});

const filtreObjets = document.querySelector(".btn-filter2")
filtreObjets.addEventListener("click", () => {
    categoriesFiltred("Objets");
});

const filtreAppart = document.querySelector(".btn-filter3")
filtreAppart.addEventListener("click", () => {
    categoriesFiltred("Appartements");
});

const filtreHotel = document.querySelector(".btn-filter4")
filtreHotel.addEventListener("click", () => {
    categoriesFiltred("Hotels & restaurants");
});

/* Création de la modale */

let modal = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')

    generateCard2(e)
    modal.addEventListener("click", closeModal)
    modal.querySelector('.js-btn-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    const itemCard = document.getElementById('card_container');
    itemCard.innerHTML = ""
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-btn-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js_modal").forEach(a => {
    a.addEventListener("click", openModal)

})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

async function getWorks() {
    let rep = await fetch("http://localhost:5678/api/works");
    let reponse = await rep.json();
    return reponse;
};

/* Fonction pour créer chaque Card de chaque élément récuper de l'API*/
async function generateCard2() {

    let allWork = await getWorks("http://localhost:5678/api/works")

    for (let i = 0; i < allWork.length; i++) {

        const itemCard = document.getElementById('card_container');

        itemCard.innerHTML += `

            <figure id="card_modal">
                <img crossorigin="anonymous" src="${allWork[i].imageUrl}" alt="${allWork[i].title}" />
                <i class="fa-regular fa-trash-can"></i>
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <figcaption class="suppr_test"><a href="#">éditer</a></figcaption>
            </figure>`;
    };
};

/* Delete elements de la modale*/



const deleteWork = document.querySelector(".suppr_total")
deleteWork.addEventListener("click", () => {
    deletingWork();
});

const deletingWork = async function (e) {
    const response = await fetch("http://localhost:5678/api/works/id", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        },
    })
        .then(res => console.log(res))

    let test = await response.json();
    console.log(test);
};

/* fonction pour Post un Work */

const ajoutElement = document.querySelector(".btn_form")
ajoutElement.addEventListener("click", () => {
    postWork();
});

/*const postWork = async function (e) {
    const response = await fectch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
        },
        body:, 
    })
}*/



/* fonction pour ouvrir la modale 2 d'ajout d'éléments */

let modal2 = null

const openModal2 = function (e) {
    e.preventDefault()
    modal2 = document.querySelector(e.target.getAttribute("href"))
    modal2.style.display = null
    modal2.removeAttribute('aria-hidden')
    modal2.setAttribute('aria-modal', 'true')
    generateForm(e)
    modal2.addEventListener("click", closeModal2)
    modal2.querySelector('.js-btn-close2').addEventListener('click', closeModal2)
    modal2.querySelector('.back_close_btn').addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation2)
}

const closeModal2 = function (e) {
    if (modal2 === null) return
    const itemCard = document.getElementById('form_container');
    itemCard.innerHTML = ""
    modal2.style.display = "none"
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal2.removeEventListener('click', closeModal2)
    modal2.querySelector('.js-btn-close2').removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation2)
    modal2 = null
}

const stopPropagation2 = function (e) {
    e.stopPropagation(e)
}

document.querySelectorAll(".js_modal2").forEach(a => {
    a.addEventListener("click", openModal2)

})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal2(e)
    }
})

async function generateForm() {

    const itemCard = document.getElementById('form_container');

    itemCard.innerHTML += `

            <form id="form_container">
                <div class="ajout_img">
                    <i class="fa-solid fa-image fa-4x"></i>
                    <label for="file" class="img_label">+ ajouter photo</label>
                    <input type="file" id="myfile" name="myfile">
                    <p>jpg. png 4mo max</p>
                </div>
                <p class="titre_form">Titre</p>
                <input type="text" name="titre" class="titre_input">
                <p class="categorie_form">Catégorie</p>
                <select name="catégories" id="categorie">
                    <option value="objet">Objet</option>
                    <option value="Hôtel & restaurants">Hôtel & restaurants</option>
                    <option value="appartements">Appartements</option>
                </select>
                <p class="erreur_form">Champs vide ou invalide</p>
            </form>`
        ;
};

