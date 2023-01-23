
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

