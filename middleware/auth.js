const auth = (app) => {
    app.use((req, res, next) => {
        if('user' in req.session){
            res.locals.user = req.session.user
        }
        next()
    })
}
module.exports = {
    auth
}