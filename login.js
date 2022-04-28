errors = document.querySelector("[data-errors]")
errors.style.display = 'none'

username = document.getElementById("username")
password = document.getElementById("password")
// data = {username: "Becker", password: "123456"}


function handleLoginButton() {
    console.log("API_URL",)
    fetch(`${API_URL}/login/${username.value}/${password.value}`)
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
