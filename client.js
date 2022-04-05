

outfits = []

fetch(`http://localhost:3000/outfits`)
.then(response => response.json())
.then(data => {
    console.log(data)
})



