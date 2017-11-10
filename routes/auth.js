const User = require('../models/user')

const auth = (app) => {
    app.get('/login', (req, res) => {res.render('login')})
    app.post('/login', async (req, res) => {
        const user = await User.findOne({username: req.body.usuario})
        if(user === null){
            res.send('Usuário não encontrado')
        }else{
            const isValid = await user.checkPassword(req.body.senha)
            if(isValid){
                req.session.user = user
                res.redirect('/')
            }else{
                res.redirect('/login')
            }
        }
    })
    app.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    })
}

module.exports = {
    auth
}