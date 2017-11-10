const Noticia = require('../models/noticia')

const web = (app) => {
    app.get('/', (req, res) => {res.render('index')})

    app.get('/noticias', (req, res) => {res.send('noticias publicas')})

    app.get('/restrito', (req, res) => {res.send('restrito')})
    app.get('/restrito/noticias', (req, res) => {res.send('noticias restritas')})
}

module.exports = {
    web
}