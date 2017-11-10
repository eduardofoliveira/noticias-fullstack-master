const middleware = (app) => {
    app.use((req, res, next) => {
        if('user' in req.session){
            res.locals.user = req.session.user
        }
        next()
    })
    
    app.use('/restrito', (req, res, next) => {
        if('user' in  req.session){
            return next()
        }else{
            res.redirect('/login')
        }
    })
}

module.exports = {
    middleware
}