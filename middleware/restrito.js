const restrito = (app) => {
    app.use('/restrito', (req, res, next) => {
        if('user' in  req.session){
            return next()
        }else{
            res.redirect('/login')
        }
    })
}
module.exports = {
    restrito
}