/* Appel du bouton*/
const login = document.querySelector(".btn_login")
login.addEventListener("click", () => {
    verifLogin();
});

async function verifLogin() {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const mdpRegex = /^[a-zA-Z] [\w-]+$/;

    let emailValue = document.querySelector('.email');
    let passwordValue = document.querySelector('.password');

    if (!emailRegex.test(emailValue.value) || emailValue.value === "") {
        document.querySelector('.erreur_email').style.display = "block";

    } else if (!passwordValue.value) {
        document.querySelector('.erreur_email').style.display = "none";
        document.querySelector('.erreur_password').style.display = "block";

    } else {
        document.querySelector('.erreur_password').style.display = "none";

        let loginInfo = {
            email: emailValue.value,
            password: passwordValue.value
        }

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {

                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(loginInfo),



        });
        let test2 = await response.json();
        console.log(test2, "coucou");
        window.localStorage.setItem("token", test2.token);

        if (response.status !== 200) {
            document.querySelector('.erreur_password').style.display = "block";
        };


        if (response.status === 200) {
            location.href = "index_edited.html"
        };

    }








};

