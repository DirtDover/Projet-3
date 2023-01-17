

async function getWorks(url) {
    let rep = await fetch("http://localhost:5678/api/works");
    let reponse = await rep.json();
    return reponse;
};

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


async function getCategories(url) {
    let rep = await fetch("http://localhost:5678/api/categories");
    let reponse = await rep.json();
    return reponse;
};

async function generateCardFiltred(filter) {

    let categoriesFiltred = await getCategories("http://localhost:5678/api/categories")

    for (let i = 0; i < categoriesFiltred.length; i++) {
        const itemcard = document.getElementById('gallery');
        itemcard.innerHTML += `
            <figure class="card-gallery">
            <img crossorigin="anonymous" src="${categoriesFiltred[i].imageUrl}" alt="${categoriesFiltred[i].title}" />
            <figcaption>${categoriesFiltred[i].title}</figcaption>
        </figure>`;
    };
}

const btn = document.querySelector(".btn-filter1");
btn.addEventListener("click", () => {
    generateCardFiltred();
})



getWorks();
generateCard();
getCategories();



