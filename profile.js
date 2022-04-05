if (sessionStorage.getItem('sessionKey')) {
    let currentView = location.href.split('/').slice(-1)[0]
    if (currentView == 'profile.html') {
        userId = sessionStorage.getItem('sessionKey')
        loadOpinatedOutfits()
    }
}
else 
    location.href = "/login.html"

async function loadOpinatedOutfits() {
    tbody = document.querySelector(".tbody")
    tbody.innerHTML = ""
    let response = await fetch(`http://localhost:3000/outfit-opinion/${userId}`).then(response => response.json())
    response = response.message
    console.log("repsonse:",response)
    response.forEach(data => {
        tbody.innerHTML += generateRow(data)
    })
}



function generateRow(data) {
    
    newCard = `
    <tr>
      <th scope="row">${data.ID_Outfit}</th>
      <td>${data.Name}</td>
      <td>${data.Description}</td>
      <td>
        <button type="button" class="btn btn-secondary" id="update_${data.ID}" data-outfitId="${data.ID_Outfit}" onclick="updateOutfitOpinion(${data.ID})"><i class="fas fa-pencil" aria-hidden="true"></i></button>
            
        
        <button type="button" class="btn btn-danger" id="delete_${data.ID}" data-outfitId="${data.ID_Outfit}" onclick="deleteOutfitOpinion(${data.ID})"><i class="fa fa-trash" aria-hidden="true"></i></button>

      </td>
    </tr>
    `
    return newCard
}

async function updateOutfitOpinion(id) {
    location.href = `/rateOutfit.html?id=${id}`
    /*
    updateButton = document.getElementById(`update_${id}`)
    idOutfit = updateButton.dataset.outfitid
    console.log(idOutfit)
    //response = await fetch(`http://localhost:3000/outfits/${idOutfit}`).then(response => response.json())
    //response = response.message
    //console.log(response)
     
    response = await fetch(`http://localhost:3000/cloth-opinion/${userId}/${idOutfit}`).then(response => response.json())
    response = response.message
    currentOutfit = response
    console.log(currentOutfit)
    */

    // return response
}

async function deleteOutfitOpinion(id) {
    deleteButton = document.getElementById(`delete_${id}`)
    idOutfit = deleteButton.dataset.outfitid
    response = await fetch(`http://localhost:3000/outfits/${idOutfit}`).then(response => response.json())
    response = response.message
    // console.log(response)

    response.forEach(cloth => { 
        fetch(`http://localhost:3000/cloth-opinion/${userId}/${idOutfit}/${cloth.ID_Cloth}`, {method: 'DELETE'}).then(response => response.json())
    })

    fetch(`http://localhost:3000/outfit-opinion/${id}`, {
        method: 'DELETE',
    }).then(response => { response.json(); loadOpinatedOutfits() })

}

function logOut() {
    sessionStorage.removeItem('sessionKey');
    location.href = "/login.html"

}

async function loadOutfit(outfit) {
    let response = await fetch(`http://localhost:3000/outfits/${outfit.ID}`)
    .then(response => response.json())
    //.then(data => data)
    //.then(data => {
        //console.log('data.message', data.message)
        //outfit = data.message
    //})
    // console.log('outfit', response)
    outfit.clothes = response.message
    return outfit
}