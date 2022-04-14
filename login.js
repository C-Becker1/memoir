errors = document.querySelector("[data-errors]")
errors.style.display = 'none'

username = document.getElementById("username")
password = document.getElementById("password")
// data = {username: "Becker", password: "123456"}

async function handleLoginButton() {

    response = await getData(url="https://10.6.41.56:3000/login/", username.value, password.value)
    console.log(response)
    response.then(response => response.json())
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

    //console.log("WENA QLA")

}



// Example GET method implementation:
async function getData(url = '', username, password) {
    // Default options are marked with *
    url = `${url}${username}/${password}`
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response
}
