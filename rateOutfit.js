

if (sessionStorage.getItem('sessionKey')) {
    userId = sessionStorage.getItem('sessionKey')

    let currentView = location.href.split('/').slice(-1)[0]
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
            // loadClothesId(data.clothes)

        })
    }

}
else 
    location.href = "/login.html"

//CARGAR CADA UNA DE LAS CATEGORÍAS OPINADAS
/*function loadClothesId(clothes) {
    clothes.forEach(cloth => {
        console.log("clothsss:", cloth)
    })
}*/

function loadOutfitTitles(data) {
    document.querySelector(".outfit-name").innerHTML = data.Name 
    desc = document.querySelector(".outfit-desc").innerHTML = data.Description
}

function loadUpdateButton() {
    row = document.querySelector("[flex-container]")
    row.innerHTML = ""

    button = `
        <button type="button" class="btn btn-secondary submitButton" onclick="handleSubmit(true)">Actualizar</button>
    `
    row.innerHTML = button
}


async function loadOutfitWithOpinion(id) {
    response = await fetch(`${API_URL}/outfit-opinions/${id}`).then(response => response.json())
    response = response.message[0]
    
    temp = await fetch(`${API_URL}/cloth-opinion/${userId}/${response.ID_Outfit}`).then(response => response.json())
    response.clothes = temp.message
    // currentOutfit = response

    document.querySelector(".outfit-data").dataset.outfitId = id


    checkedCategories = response.Weather_Classification.split(",")
    outfitCategories = document.querySelectorAll(".messageCheckbox")
    outfitCategories.forEach( x => {
        if (response.Weather_Classification.includes(x.value))
            x.checked = true

    } )
    document.getElementById("outfitGoodLooks").value = response.GoodLooks_Calification

    // console.log("checkedCategories", checkedCategories)

    cardList = document.querySelector(".card-list")
    cardList.innerHTML = ""
    /*
    response.clothes.forEach(async (cloth) => {
        clothAttr = await fetch(`${API_URL}/clothes/${cloth.ID}`).then(response => response = response.json())
        clothAttr = clothAttr.message[0].attributes
        cloth.attributes = clothAttr
    })
    */    
    response.clothes.forEach(cloth => {
        console.log("Cloth:", cloth )
        cardList.innerHTML += generateCard(cloth, cloth.Weather_Classification.split(","))
    })

    response.clothes.forEach( x => {
        node = document.getElementById(`clothGoodLooks_${x.ID_Cloth}`)
        node.value = x.GoodLooks_Calification

        // data.ID = cardList.children[i].dataset.rid

    })
    
    /*
    response.clothes.forEach(cloth => {
        // selector = document.getElementById(`clothGoodLooks_${cloth.ID_Cloth}`)
        // selector.value = cloth.GoodLooks_Calification//`"${cloth.goodLooksCalification}"`

        console.log("Cloth:", cloth)
        node = document.getElementById(`clothWeatherClassification_${cloth.ID_Cloth}`)
        console.log("node", node)
        selector = node.querySelectorAll(".categoriaCheckbox")
        console.log("SELECTOR", selector)
        selector.forEach( x=> {
            if (cloth.Weather_Classification.includes(x.value))
                x.checked = true
        }) //value = cloth.Weather_Classification
    })
    */

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
    console.log("outfitId:", outfitId)
    categoriesChecked = document.querySelectorAll('.messageCheckbox:checked');
    
    outfitGoodLooks = document.getElementById("outfitGoodLooks").value

    let categories = [] 
    categoriesChecked.forEach( c => {
        categories.push(c.value)
    } )
    categories = categories.join()

    
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
    data = {
        idOutfit: outfitId,
        idUser: userId,
        weatherClassification: categories,  //se itera para subir varios registros. Uno por cada categoría definida
        goodLooksCalification: outfitGoodLooks
    }

    if (isUpdate) {
        //actualizar
        data.ID = idOpinion
        await putData(`${API_URL}/outfit-opinion`, data)

    }
    else {
        await postData(`${API_URL}/outfit-opinion`, data)
    } 
    

    // Una vez subida la calificación para el outfit,
    // se debe iterar sobre el DOM element de listado de cartas
    // o sobre el arreglo de clothes del outfit para registrar uno a uno
    // los valores definidos por usuario
    for (let i = 0; i < cardList.children.length; i++) {
        
        clothGoodLooks = cardList.children[i].querySelector(".goodLooks").value
        categoria = cardList.children[i].querySelectorAll(".categoriaCheckbox:checked")
        let categories = []
        categoria.forEach( c => {
            categories.push(c.value)
        })
        categories = categories.join()
        
        data = {
            idCloth: cardList.children[i].dataset.clothid,
            idUser: userId,
            goodLooksCalification: clothGoodLooks,
            weatherClassification: categories,
            idOutfit: outfitId
        }
        if (isUpdate) {
            // actualizar registros uno a uno
            data.ID = cardList.children[i].dataset.rid
        
            await putData(`${API_URL}/cloth-opinion`, data)
        }
        else {
            await postData(`${API_URL}/cloth-opinion`, data)
        }
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



const COLOR_DISENHO = "lime"
const COLOR_LARGO_DE_MANGAS = "red" 
const COLOR_LARGO_DE_FALDA = "magenta"
const COLOR_TIPO_DE_CUELLO = "brown"
const COLOR_MATERIAL = "blue"
const COLOR_AJUSTE = "grey"

const ATTRIBUTES_DATA = {
    //Diseño
    "floral": ["floral", COLOR_DISENHO], 
    "graphic": ["gráfico", COLOR_DISENHO], 
    "striped": ["rayado", COLOR_DISENHO], 
    "embroidered": ["bordado", COLOR_DISENHO], 
    "pleated": ["plisado", COLOR_DISENHO], 
    "solid": ["sólido", COLOR_DISENHO],
    "lattice": ["patrón celosía", COLOR_DISENHO],
    //Largo de Mangas
    "long_sleeve": ["manga larga",COLOR_LARGO_DE_MANGAS], 
    "short_sleeve": ["manga corta",COLOR_LARGO_DE_MANGAS],
    "sleeveless": ["sin manga",COLOR_LARGO_DE_MANGAS],
    //Largo de Falda
    "maxi_length": ["largo maxi",COLOR_LARGO_DE_FALDA], 
    "mini_length": ["largo mini",COLOR_LARGO_DE_FALDA], 
    "no_dress": ["sin vestido",COLOR_LARGO_DE_FALDA],
    //Tipo de cuello
    "crew_neckline": ["escote redondo",COLOR_TIPO_DE_CUELLO], 
    "v_neckline": ["escote en v",COLOR_TIPO_DE_CUELLO], 
    "square_neckline": ["escote cuadrado",COLOR_TIPO_DE_CUELLO], 
    "no_neckline": ["sin escote",COLOR_TIPO_DE_CUELLO],
    //Material
    "denim": ["vaqueros",COLOR_MATERIAL],
    "chiffon":["gasa",COLOR_MATERIAL], 
    "cotton":["algodón",COLOR_MATERIAL], 
    "leather":["cuero",COLOR_MATERIAL], 
    "faux":["falso",COLOR_MATERIAL], 
    "knit":["tejer",COLOR_MATERIAL],
    //Ajuste
    "tight": ["apretado",COLOR_AJUSTE],
    "loose":["suelto",COLOR_AJUSTE],
    "conventional":["convencional",COLOR_AJUSTE]
}

function generateHtmlTags(attributes) {
    let tagList = ""
    for (attr of attributes) {
        nametag = ATTRIBUTES_DATA[attr.toLowerCase()][0]
        newTag = `
            <div class="tag ${ATTRIBUTES_DATA[attr.toLowerCase()][1]}">
                ${nametag}
            </div>
        `
        
        tagList += newTag
    }
    return tagList
}

function generateCard(data, values_checked = []) {
    let id = data.ID != undefined ? data.ID : ''
    img_name = data.Name.replace("-img", "") 

    CATEGORIAS = ["Frío", "Lluvioso", "Húmedo", "Templado", "Caluroso"]
    checkboxes = ""
    for (let i = 0; i < CATEGORIAS.length; i++) {
        isChecked = ""
        value = `${i + 1}`
        if (values_checked.includes(value)) {
            isChecked = "checked"
        }

        checkbox = `
            <label class="p-left">
                <input class="categoriaCheckbox" type="checkbox" value="${value}" ${isChecked}> ${CATEGORIAS[i]}
            </label>
        `
        checkboxes += checkbox
    }

    newCard = `
    <div class="card" data-clothId="${data.ID_Cloth}" data-rId=${data.ID}>
        <div class="card-image">
        <img src="${BASE_ROUTE}/${data.IMG_Route}" class="card-img-cloth" alt="${img_name}"/>
        </div>
        <div class="card-body">
            <h5 class="card-title">${img_name}</h5>
            <div class="card-tags">${ generateHtmlTags(data.attributes) }</div>
            
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
                ${checkboxes}
            </div>
    `
    return newCard
}

async function loadOutfits() {
    response = await fetch(`${API_URL}/outfits`)
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
    let response = await fetch(`${API_URL}/outfits/${outfit.ID}`)
    .then(response => response.json())
    outfit.clothes = response.message
    return outfit
}

// Example POST method implementation:
async function postData(API_URL = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(API_URL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-API_URL
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function putData(API_URL = '', data = {}) {
    console.log("PUT data:", data)
    const response = await fetch(API_URL, {
        method: 'PUT', 
        mode: 'cors',   
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            // 'Access-Control-Allow-Origin': '*',

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
    let idOutfit = outfitData.dataset.outfitId
    let response = await fetch(`${API_URL}/outfit-opinion/${userId}/${idOutfit}`).then(response => response.json())
    
    return response.message.status
        if (result.message.status === true) {
            // ya opinó sobre este outfit
            i++ 
        }
    
}
