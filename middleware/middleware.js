const middleware = (app) => {
    require('./auth').auth(app)
    require('./restrito').restrito(app)
}

module.exports = {
    middleware
}