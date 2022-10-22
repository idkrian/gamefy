require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ msg: 'Olá' })
})

//Models
const User = require('./models/User')

//Registrar Usuário
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if (!name) {
        return res.status(422).json({ msg: "Nome é obrigatório" })
    }

})

//Credenciais
const dbUser = process.env.DB_USER
const dpPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dpPassword}@cluster0.d3d4myy.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000, (req, res) => {
            console.log('Funfou')
        })
    })
    .catch((err) => console.log(err))

