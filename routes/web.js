const Noticia = require('../models/noticia')

const web = (app) => {
    app.get('/', (req, res) => {res.render('index')})

    app.get('/noticias', async (req, res) => {
        const noticias = await Noticia.find({ category: 'public' })
        res.render('noticias/index', {noticias})
    })

    app.get('/restrito', (req, res) => {
        res.send('restrito')
    })
    app.get('/restrito/noticias', async (req, res) => {
        const noticias = await Noticia.find({ category: 'private' })
        res.render('noticias/restrito', {noticias})
    })
}

module.exports = {
    web
}