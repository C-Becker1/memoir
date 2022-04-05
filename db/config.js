const mysql = require('mysql')
require('dotenv').config({ path: __dirname + '/.env' })

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

var db = mysql.createConnection(config)

db.connect( (err) => {
    if (err) throw err
    
    console.log("Connected to Database")
})

module.exports = db
