const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./models/user')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 80
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://192.168.3.30/noticias'

app.set('view engine', 'ejs')

app.use(session({secret: 'fullstack-master'}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

app.use('/restrito', (req, res, next) => {
    if('user' in  req.session){
        return next()
    }else{
        res.redirect('/login')
    }
})

require('./routes/web').web(app)

const createInitialUser = async () => {
    const total = await User.count({username: 'admin'})
    if(total === 0){
        const user = new User({
            username: 'admin',
            password: 'admin'
        })
        await user.save()
        console.log('Usuário administrador criado: \nUsuário: admin \nSenha: admin')
    }else{
        console.log('conta admin já existe')
    }
}

mongoose
    .connect(mongo, {useMongoClient: true})
    .then(() => {
        createInitialUser()
        app.listen(port, () => console.log('Running...'))
    })
    .catch( erro => console.log(erro))