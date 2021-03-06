const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 80
mongoose.Promise = global.Promise
const mongo = process.env.MONGODB || 'mongodb://192.168.3.30/noticias'

app.set('view engine', 'ejs')

app.use(session({secret: 'fullstack-master', resave: false, saveUninitialized: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

require('./middleware/middleware').middleware(app)

require('./routes/web').web(app)
require('./routes/auth').auth(app)

const createInitialUser = async () => {
    const total = await User.count({username: 'admin'})
    if(total === 0){
        const user = new User({
            username: 'admin',
            password: 'admin'
        })
        await user.save()
        console.log('Usuário administrador criado: \nUsuário: admin \nSenha: admin')
    }
}

mongoose
    .connect(mongo, {useMongoClient: true})
    .then(() => {
        createInitialUser()
        app.listen(port, () => console.log('Running...'))
    })
    .catch( erro => console.log(erro))