require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const mysql = require('mysql')
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}


pool = mysql.createPool(config)
pool.getConnection((err, conn) => {
    if (err) {
        console.log(`Ocurrió un error: ${err}`)
    }
    else {
        console.log("Conexión realizada!")
    }
})

app.use(express.json())



/*** clothes  ***/
app.get('/clothes', (req, res) => {
    pool.query('SELECT * FROM cloth', function (error, results, fields) {
        if (error) throw error;

        res.send({message: results});
      });
})

app.get('/clothes/:id', (req, res) => {
    pool.query(`SELECT * FROM cloth WHERE id = ${req.params.id}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    } )
})


app.post('/cloth-opinion', (req, res) => {
    values = `${req.body.idCloth}, ${req.body.idUser}, ${req.body.weatherClassification}, ${req.body.goodLooksCalification}, ${req.body.idOutfit}`
    pool.query(`INSERT INTO cloth_opinion (ID_Cloth, ID_User, Weather_Classification, GoodLooks_Calification, ID_Outfit) VALUES (${values})`, (error, results, fields) => {
        if (error) throw error
        
        res.send({message: results})
    })
})

app.put('/cloth-opinion', (req, res) => {
    values = `${req.body.idCloth}, ${req.body.idUser}, ${req.body.weatherClassification}, ${req.body.goodLooksCalification}, ${req.body.idOutfit}`
    pool.query(`UPDATE cloth_opinion SET Weather_Classification = ${req.body.weatherClassification}, GoodLooks_Calification = ${req.body.goodLooksCalification} WHERE ID = ${req.body.ID}`, (error, results, fields) => {
        if (error) throw error
        
        res.send({message: results})
    })
})

app.delete('/cloth-opinion/:idUser/:idOutfit/:idCloth', (req, res) => {
    pool.query(`DELETE FROM cloth_opinion WHERE ID_User = ${req.params.idUser} AND ID_Outfit = ${req.params.idOutfit} AND ID_Cloth = ${req.params.idCloth}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})

app.get('/cloth-opinion/:idUser/:idOutfit', (req, res) => {
    pool.query(`SELECT c.ID, co.ID_Cloth, co.ID, co.Weather_Classification, co.GoodLooks_Calification, c.Name, c.Description, c.IMG_Route FROM cloth_opinion as co INNER JOIN cloth AS c ON c.ID = co.ID_Cloth WHERE ID_User = ${req.params.idUser} AND ID_Outfit = ${req.params.idOutfit}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})
/**************/


/*** outfit ***/
// quiero seleccionar outfits aleatorios con un LIMIT. Luego, quiero buscar en la tabla de relaciones de
// para retornar el nombre una vez y las prendas asociadas.
app.get('/outfits', (req, res) => {

    pool.query(`SELECT t1.ID, t1.Name, t1.Description
        FROM outfit t1
        LEFT JOIN outfit_opinion t2 ON t2.ID_Outfit = t1.ID
        WHERE t2.ID_Outfit IS NULL ORDER BY RAND() LIMIT 10`,
        
        (error, results, fields) => {
        
            if (error) throw error

        res.send({message: results})
    })
})

app.get('/outfits/:id', (req, res) => {
    pool.query(`SELECT ID_Cloth, Name, Description, IMG_Route FROM rel_cloth_outfit INNER JOIN cloth ON cloth.ID = rel_cloth_outfit.ID_Cloth WHERE rel_cloth_outfit.ID_Outfit = ${req.params.id}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})

app.post('/outfit-opinion', (req, res) => {
    values = `${req.body.idOutfit}, ${req.body.idUser}, ${req.body.weatherClassification}, ${req.body.goodLooksCalification}`
    pool.query(`INSERT INTO outfit_opinion (ID_Outfit, ID_User, Weather_Classification, GoodLooks_Calification) VALUES (${values})`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})

app.put('/outfit-opinion', (req, res) => {
    pool.query(`UPDATE outfit_opinion SET Weather_Classification = ${req.body.weatherClassification}, GoodLooks_Calification = ${req.body.goodLooksCalification} WHERE ID = ${req.body.ID}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
    
})

app.get('/outfit-opinions/:id', (req, res) => {
    pool.query(`SELECT * FROM outfit_opinion as oo INNER JOIN outfit AS o ON oo.ID_Outfit = o.ID WHERE oo.ID = ${req.params.id}`, (error, results, fields) => {
        if (error) throw error
        res.send({message: results})
    })
})

app.get('/outfit-opinion/:userId', (req, res) => {
    pool.query(`SELECT oo.ID_Outfit, oo.ID, oo.Weather_Classification, oo.GoodLooks_Calification, o.Name, o.Description FROM outfit_opinion as oo INNER JOIN outfit AS o ON o.ID = oo.ID_Outfit WHERE ID_User = ${req.params.userId}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})

app.delete('/outfit-opinion/:id', (req, res) => {
    pool.query(`DELETE FROM outfit_opinion WHERE ID = ${req.params.id}`, (error, results, fields) => {
        if (error) throw error
        res.send({message: results})
    })
})

app.get('/outfit-opinion/:userId/:outfitId', (req, res) => {
    pool.query(`SELECT * FROM outfit_opinion WHERE ID_User = ${req.params.userId} AND ID_Outfit = ${req.params.outfitId}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: {status: !results.length == 0}})
        
    })
})

/**************/

/*** REL CLOTH OUTFIT***/
app.get('/relClothOutfit/:idOutfit', (req, res) => {
    pool.query(`SELECT * FROM rel_cloth_outfit WHERE id_outfit = ${req.params.idOutfit}`, (error, results, fields) => {
        if (error) throw error

        res.send({message: results})
    })
})
/**************/

/*** User ***/
app.get('/login/:username/:password', (req, res) => {
    pool.query(`SELECT * FROM user WHERE username = "${req.params.username}" AND password = "${req.params.password}"`, (error, results, fields) => {
        console.log("Verificando Identidad...")
        if (error) {
            console.log("Error en login:", error)
            throw error
        }
        if (results.length > 0) {
            console.log("results:", results)
            res.send({state: "success", message: results})
        }
        else 
            res.send({state: "error"})
    })
})
/**************/

const server = app.listen(3000, (error) => {
    if (error) return console.log(`Error: ${error}`)

    console.log("Server started")
})