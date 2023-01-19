function login() {
    const submit = document.querySelector(".btn_login");
    submit.addEventListener("submit", function () {
        let username = document.getElementById("e_mail");
        let password = document.getElementById("password");

        if (username === "sophie.bluel@test.tld" && password === "S0phie") {
            console.log("bravo")
            return true
            window.open(index.html)
        } else {
            alert("Identifiant faux");
        }

    })
}

login();



