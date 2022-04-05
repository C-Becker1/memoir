const { getOneById, getAll } = require("./querys")

const mysql = require('mysql')

const config = require('./config')

pool = mysql.createPool(config)

function GetOneById(id) {
    table = "clothes"
    pool.query(`SELECT FROM ${table} WHERE id = ${id}`, function (error, results, fields) {
        if (error) throw error;
        
        return results
    })
}

module.exports = {
    GetOneById
}