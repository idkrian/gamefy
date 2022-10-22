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

//Private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id, "-password")

    if (!user) {
        return res.status(422).json({ msg: "Usuário não encontrado" })
    }

    res.status(200).json({ user })

})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })

    }

    try {
        const secret = process.env.JWT_SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" })
    }
}

//Registrar Usuário
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if (!name) {
        return res.status(422).json({ msg: "O Nome é obrigatório" })
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "A Senha é obrigatória" })
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "As Senhas não conferem" })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(422).json({ msg: "Por favor utilize outro email" })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()
        res.status(201).json({ msg: "Usuário criado com sucesso!" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//Login do Usuário
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "A Senha é obrigatória" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(422).json({ msg: "Usuário não encontrado!" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida!" })
    }

    try {
        const secret = process.env.JWT_SECRET

        const token = jwt.sign({
            id: user._id
        }, secret)

        res.status(200).json({ message: 'Autenticado com sucesso!', token })
    } catch (error) {
        res.status(500).json({ message: error })

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

