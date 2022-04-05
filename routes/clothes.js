//const pool = require('../db/config')

const express = require('express')
const clothesRouter = express.Router();
const clothesManager = require('../db/ClothesManager')

// Getting all
clothesRouter.get('/', (req, res) => {
    res.send(req.params)
})
// Getting one 
clothesRouter.get('/:id', (req, res) => {
    res.send(clothesManager.GetOneById(req.params.id))
})
// Creating one
clothesRouter.post('/', (req, res) => {

})
// Updating one
clothesRouter.patch('/:id', (req, res) => {})

// Deleting one
clothesRouter.delete('/:id', (req, res) => {})

module.exports = clothesRouter
