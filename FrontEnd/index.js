

async function getWorks() {
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

async function categoriesFiltred(categorie) {

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
    }
}





const filtreObjets = document.querySelector(".btn-filter2")
filtreObjets.addEventListener("click", () => {
    categoriesFiltred("Objets");
});

generateCard();
