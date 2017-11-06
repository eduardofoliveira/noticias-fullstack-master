const Noticia = require('../models/noticia')
const User = require('../models/user')

const web = (app) => {
    app.get('/login', (req, res) => {
        res.render('login')
    })
    app.post('/login', async (req, res) => {
        const user = await User.findOne({username: req.body.usuario})
        if(user === null){
            res.send('Usuário não encontrado')
        }else{
            const isValid = await user.checkPassword(req.body.senha)
            if(isValid){
                req.session.user = user
                res.redirect('/restrito/noticias')
            }else{
                res.redirect('/login')
            }
        }
        
    })

    app.get('/noticias', (req, res) => {
        res.send('noticias publicas')
    })

    app.get('/restrito', (req, res) => {
        res.send('restrito')
    })
    app.get('/restrito/noticias', (req, res) => {
        res.send('noticias restritas')
    })
}

module.exports = {
    web
}