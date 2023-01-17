

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
    console.log(reponse)
    return reponse;
};



const btnFilter = document.querySelector(".btn-filter1");

btnFilter.addEventListener("click", function () {
    const workFilter = reponse.filter(function (categorie) {
        return reponse.name === "Objets"
    });
    console.log(workFilter)
});


getWorks();
generateCard();
getCategories();



