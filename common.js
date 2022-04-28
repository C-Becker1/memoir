const isDevelopment = true

BASE_ROUTE = "/images/sv_img_200x200"
API_URL = "https://sebastian-rg.com/api"
if (isDevelopment) {
    BASE_ROUTE = "C:/Users/Sebastian/Desktop/data/Generador de Conjuntos/sv_img_200x200"    
    API_URL = "http://localhost:3000"
}

console.log("isDevelopment?", isDevelopment)