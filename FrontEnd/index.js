
if (window.localStorage.getItem("token")) {

    const bandeau = document.querySelector('.edition_container');

    bandeau.innerHTML += `

    <div class="barre_edition">
            <i id="edit_icon" class="fa-regular fa-pen-to-square"></i>
            <p class="texte_edition" class="js_modal"><a href="#modal1">Mode édition</a></p>
            <button class="btn_edit">publier les changements</button>
        </div>`;

    document.querySelector('.btn-container').style.display = "none";

    const modif = document.querySelector('.mes_projets');

    modif.innerHTML += `

            <i id="edit_icon2" class="fa-regular fa-pen-to-square"></i>
			<a href="#modal1" class="js_modal">Modifier</a>`

} else {
    alert("coucou")
}
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
                <button class="trash">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <figcaption class="suppr_test"><a href="#">éditer</a></figcaption>
            </figure>`;

    };

    const deleteWork = document.getElementsByClassName("trash")
    for (let i = 0; i < deleteWork.length; i++) {

        deleteWork[i].addEventListener("click", () => {
            deletingWork(i + 1);
        });
    }
};

/* Delete elements de la modale*/

const deletingWork = async function (i) {

    const response = await fetch("http://localhost:5678/api/works/" + i, {
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

function generateForm() {

    const itemCard = document.getElementById('form_container');

    itemCard.innerHTML += `

            <form method="post" enctype="multipart/form-data" id="form_container" class="form_container">
                <div class="ajout_img">
                    <i class="fa-solid fa-image fa-4x"></i>
                    <input type="file" id="imageUrl" name="imageUrl" accept="image/*" style="display:none" >
                    <label for="imageUrl" class="label_img">+ Ajouter Photo</label>
                    <p class="mo_max">jpg. png 4mo max</p>
                </div>
                <p class="titre_form">Titre</p>
                <input type="text" name="title" id="titre_input" class="titre_input">
                <p class="categorie_form">Catégorie</p>
                <select name="categoryId" id="categorie" class="categorie">
                    <option value="1">Objet</option>
                    <option value="2">Hôtel & restaurants</option>
                    <option value="3">Appartements</option>
                </select>
                <p class="erreur_form">Champs vide ou invalide</p>
                <input type="submit" id="btn_form" value="Ajouter">
            </form>`
        ;

};

/* fonction pour Post un Work */

// Selecteur + URL
const form = document.getElementById("form_container");
const url = "http://localhost:5678/api/works";

// Ajout de l'événement Submit
form.addEventListener("submit", function (event) {

    // Désactivation du comportement par défaut du bouton
    event.preventDefault();

    // Récupération des données du formulaire
    const title = form.elements.titre_input.value; // Récupère le titre
    const file = form.elements.imageUrl.files[0]; // Récupère l'image sélectionnée
    const category = form.elements.categorie.value; // Récupère l'id de la catégorie

    const formData = {};
    formData["title"] = title;
    formData["category"] = category;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        formData["image"] = reader.result;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            body: formData
        })
            .then(response => {
                // Vérification du type de contenu de la réponse
                if (response.headers.get('Content-Type').includes("application/json")) {
                    return response.json();
                }
                throw new Error("Response is not JSON");
            })
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };
});




/*
var form = document.getElementById("form_container");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var title = form.elements.titre_input.value;
    var imageUrl = form.elements.imageUrl.value;
    var category = form.elements.categorie.value;

    var data = {
        "title": title,
        "image": imageUrl,
        "category": category
    };
    console.log(data);
    fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

});


*/


// const form = document.getElementById('form_container');
// const url = "http://localhost:5678/api/works";

// form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const title = form.elements.titre_input.value;
//     const imageUrl = form.elements.imageUrl.files[0];
//     const category = form.elements.categorie.value;

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('imageUrl', imageUrl);
//     formData.append('category', category);

//     const data = Object.fromEntries(formData);
//     console.log(data);
//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + window.localStorage.getItem("token")
//         },
//         body: JSON.stringify(data)
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log("Success:", data);
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// });




// const form = document.getElementById('form_container');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const title = form.elements.title.value;
//     const imageUrl = form.elements.imageUrl.files[0];
//     const category = document.querySelector(".categorie");

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('imageUrl', imageUrl);
//     formData.append('category', category);
//     console.log(formData);
//     try {
//         const response = await fetch('http://localhost:5678/api/works', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + window.localStorage.getItem("token")
//             },
//             body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }

//         alert('Data has been successfully sent to the API.');
//     } catch (error) {
//         console.error(error);
//         alert('An error has occurred while sending the data to the API.');
//     }
// });




// const form = document.getElementById("form_container");
// const url = "http://localhost:5678/api/works";

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);
//     console.log(data);
//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + window.localStorage.getItem("token")
//         },
//         body: JSON.stringify(data)

//     })

//         .then((response) => response.json())
//         .then((data) => {
//             console.log("Success:", data);
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// });

























