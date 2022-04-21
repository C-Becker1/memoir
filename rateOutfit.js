
const isDevelopment = true

url = "https//10.6.41.56:3000"
if (isDevelopment) {
    url = "https://localhost:3000"
}

if (sessionStorage.getItem('sessionKey')) {
    userId = sessionStorage.getItem('sessionKey')

    let currentView = location.href.split('/').slice(-1)[0]
    console.log(currentView)
    if (currentView == 'rateOutfit.html') {
        i = 0;
        outfits = loadOutfits() 
        outfits.then(array => {
            console.log("First load:", array)
            
            loadCards(array[i++])
        })

    }

    else {
        idOpinion = currentView.split("=")[1]
        loadUpdateButton()
        loadOutfitWithOpinion(idOpinion).then(data => {
            
            loadOutfitTitles(data)
            loadClothesId(data.clothes)
            

        })
    }

}
else 
    location.href = "/login.html"

//CARGAR CADA UNA DE LAS CATEGORÍAS OPINADAS
function loadClothesId(clothes) {
    clothes.forEach(cloth => {
        console.log("clothsss:", cloth)
    })
}

function loadOutfitTitles(data) {
    document.querySelector(".outfit-name").innerHTML = data.Name 
    desc = document.querySelector(".outfit-desc").innerHTML = data.Description
}

function loadUpdateButton() {
    row = document.querySelector("[flex-container]")
    console.log("row:",row)
    row.innerHTML = ""

    button = `
        <button type="button" class="btn btn-secondary submitButton" onclick="handleSubmit(true)">Actualizar</button>
    `
    row.innerHTML = button
}


async function loadOutfitWithOpinion(id) {
    response = await fetch(`${url}/outfit-opinions/${id}`).then(response => response.json())
    response = response.message[0]
    console.log(response)
    
    temp = await fetch(`${url}/cloth-opinion/${userId}/${response.ID_Outfit}`).then(response => response.json())
    response.clothes = temp.message
    // currentOutfit = response
    console.log(":DDD", response)

    cardList = document.querySelector(".card-list")
    cardList.innerHTML = ""
    response.clothes.forEach(cloth => {
        cardList.innerHTML += generateCard(cloth)
    })
    
    response.clothes.forEach(cloth => {
        console.log(cloth)
        selector = document.getElementById(`clothGoodLooks_${cloth.ID_Cloth}`)
        selector.value = cloth.GoodLooks_Calification//`"${cloth.goodLooksCalification}"`
        selector = document.getElementById(`clothWeatherClassification_${cloth.ID_Cloth}`)
        selector.value = cloth.Weather_Classification
    })

    document.getElementById("outfitGoodLooks").value = response.GoodLooks_Calification
    document.getElementById("outfitWeatherClassification").value = response.Weather_Classification
    return response
}


function displayError() {
    clearError()
    error = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
                <strong>Error: </strong> Es necesario completar todos los campos.
            </div>
        </div>
    `
    errorNode.innerHTML = error
}

function clearError() {
    errorNode = document.querySelector(".error")
    errorNode.innerHTML = ""
}


async function handleSubmit(isUpdate) {
    clearError()
    outfitId = document.querySelector(".outfit-data").dataset.outfitId
    categoriesChecked = document.querySelectorAll('.messageCheckbox:checked');
    
    outfitGoodLooks = document.getElementById("outfitGoodLooks").value

    if ( categoriesChecked.length == 0 ) {
        displayError()
        return
    }
    
    if ( !(1 <= outfitGoodLooks && outfitGoodLooks <= 10) )
    {
        displayError()
        return
    }
    
    // verificación de que todos los campos están completados. Sino, retorna
    cardList = document.querySelector(".card-list")
    for (let i = 0; i < cardList.children.length; i++) {
        
        clothGoodLooks = cardList.children[i].querySelector(".goodLooks").value
        // clothWeatherClassification = cardList.children[i].querySelector(".weatherClassification").value
        categoria = cardList.children[i].querySelector(".categoria")
        console.log("categoria:", categoria)

        if ( categoria.length == 0 ) {
            displayError()
            return
        }
    
        if ( !(1 <= clothGoodLooks && clothGoodLooks <= 10) )
        {
            displayError()
            return
        }

    }

    // En este punto, toda la data es valida
    categoriesChecked.forEach( async node => {
        data = {
            idOutfit: outfitId,
            idUser: userId,
            weatherClassification: node.value,  //se itera para subir varios registros. Uno por cada categoría definida
            goodLooksCalification: outfitGoodLooks
        }

        if (isUpdate) {
            //actualizar
            console.log("Estoy actualizando")
            data.ID = idOpinion
            await putData(`${url}/outfit-opinion`, data)
    
        }
        else
            await postData(`${url}/outfit-opinion`, data)
    } )
    

    // Una vez subida la calificación para el outfit,
    // se debe iterar sobre el DOM element de listado de cartas
    // o sobre el arreglo de clothes del outfit para registrar uno a uno
    // los valores definidos por usuario
    for (let i = 0; i < cardList.children.length; i++) {
        
        clothGoodLooks = cardList.children[i].querySelector(".goodLooks").value
        categoria = cardList.children[i].querySelectorAll(".categoriaCheckbox:checked")
        console.log("categoria:", categoria)
        categoria.forEach(async node => {
            data = {
                idCloth: cardList.children[i].dataset.clothid,
                idUser: userId,
                goodLooksCalification: clothGoodLooks,
                weatherClassification: node.value,
                idOutfit: outfitId
            }
            console.log(data)
            if (isUpdate) {
                // actualizar registros uno a uno
                console.log(cardList.children[i].dataset.rid)
                data.ID = cardList.children[i].dataset.rid
            
                await putData(`${ruta}/cloth-opinion`, data)
            }
            else
                await postData(`${url}/cloth-opinion`, data)
        })
    }

    if (isUpdate) {
        // redirigir al listado de outfits
        location.href = "/profile.html"
        return
    }

    if (i == 10) { // Estoy en el último elemento del array
        i = 0;
        outfits = loadOutfits()
        outfits.then(array => console.log("New load:", array))
    }
    outfits.then(array => {
        loadCards(array[i++])
    })
}

function generateCard(data) {
    let id = data.ID != undefined ? data.ID : ''
    data.Name = data.Name.split("-")[0] 
    newCard = `
    <div class="card" data-clothId="${data.ID_Cloth}" data-rId=${id}>
        <img src="../data/Generador de Conjuntos/images/img/${data.IMG_Route}" class="card-img-cloth" alt="${data.Name}">
        <div class="card-body">
            <h5 class="card-title">${data.Name}</h5>
            <p class="card-text">${data.Description}.</p>
            
            <label>¿Qué nota le daría a esta prenda?</label>
            <div class="selector">
                <select id="clothGoodLooks_${data.ID_Cloth}"  data-selectorType="0" class="form-select goodLooks" aria-label="Selector de calificación para una prenda">
                    <option selected>Seleccione una calificación</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <br/>
            ¿En qué climas utilizaría esta prenda?
            <div class="categoria" id="clothWeatherClassification_${data.ID_Cloth}" data-clothId="${data.ID_Cloth}">
              <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="1"> Frío
              </label>
              <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="2"> Lluvioso
              </label>
              <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="3"> Húmedo
              </label>
              <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="4"> Templado
              </label>
              <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="5"> Caluroso
              </label>
            </div>
            

        </div>
    </div>`
    return newCard
}

async function loadOutfits() {
    response = await fetch(`${url}/outfits`)
    .then(response => response.json()).then(response => response.message)
    
    return response
}

function resetSelectors() {
    categorias = document.getElementById("outfitWeatherClassification")
    categorias.querySelectorAll(".messageCheckbox:checked").forEach(node => {
        node.checked = false
    })
    document.getElementById("outfitGoodLooks").value = "0"
}

async function loadCards(outfit) {
    resetSelectors()

    outfitData = document.querySelector(".outfit-data")
    outfitData.dataset.outfitId = outfit.ID
    hasOpinated()

    cardList = document.querySelector(".card-list")
    outfitName = document.querySelector(".outfit-name")
    outfitDesc = document.querySelector(".outfit-desc")
    outfitName.innerHTML = outfit.Name
    outfitDesc.innerHTML = outfit.Description

    clothes = await loadOutfit(outfit)
    
    cardList.innerHTML = ""
    outfit.clothes.forEach( card => {
        newCard = generateCard(card)
        cardList.innerHTML += newCard
    })
}

async function loadOutfit(outfit) {
    let response = await fetch(`${url}/outfits/${outfit.ID}`)
    .then(response => response.json())

    outfit.clothes = response.message
    return outfit
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function putData(url = '', data = {}) {
    console.log("putData", data)
    const response = await fetch(url, {
        method: 'PUT', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response.json(); 
}



function logOut() {
    sessionStorage.removeItem('sessionKey');
    location.href = "/login.html"

}

async function hasOpinated() {
    outfitData = document.querySelector(".outfit-data")
    console.log(outfitData)
    let idOutfit = outfitData.dataset.outfitId
    console.log("id outfit:", idOutfit)
    let response = await fetch(`${url}/outfit-opinion/${userId}/${idOutfit}`).then(response => response.json())
    console.log("response:", response)
    
    return response.message.status
        if (result.message.status === true) {
            // ya opinó sobre este outfit
            i++ 
        }
    
}
