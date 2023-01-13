let workData = [];

const fetchWork = async () => {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((promise) => {
            workData = promise;
            console.log(workData);
        });
};

const workdisplay = async () => {
    await fetchWork();

    document.getElementById("gallery").innerHTML = `<div><img src="${workData[0].imageUrl}" alt="image appartement/></div>`;


};



workdisplay();