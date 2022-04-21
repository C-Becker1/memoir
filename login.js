errors = document.querySelector("[data-errors]")
errors.style.display = 'none'

username = document.getElementById("username")
password = document.getElementById("password")
// data = {username: "Becker", password: "123456"}

const isDevelopment = true

function handleLoginButton() {
    url = "https//10.6.41.56:3000"
    if (isDevelopment) {
        url = "https://localhost:3000"
    }


    fetch(`${url}/login/${username.value}/${password.value}`)
    .then(response => response.json())
    .then(data => {
        console.log("data:", data)
        if (data.state === 'success') {
            // almacenar sesión
            console.log(data.message[0].ID)
            sessionStorage.setItem('sessionKey', data.message[0].ID);

            // redirigir a pagina de vestuario
            location.href = "/rateOutfit.html"
        }
        else { 
            console.log("error!")
            // mostrar error en ingreso
            errors.style.display = 'block'
        }
    })
}
