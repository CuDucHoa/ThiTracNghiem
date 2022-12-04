const login = require('./login');
const forgotPassword = require('./forgotPassword');
const home = require('./home');

function route(app) {
    app.use('/', home);
    app.use('/', forgotPassword);
    app.use('/', login);
}

module.exports = route;