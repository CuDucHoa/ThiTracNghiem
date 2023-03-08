const login = require('./login');
const forgotPassword = require('./forgotPassword');
const home = require('./home');
const account = require('./account');
const test = require('./test');
const subject = require('./subject');
const classz = require('./classz');
const question = require('./question');
const result = require('./result');


function route(app) {
    app.use('/', result);
    app.use('/', question);
    app.use('/', classz);
    app.use('/', subject);
    app.use('/', test);
    app.use('/', account);
    app.use('/', home);
    app.use('/', forgotPassword);
    app.use('/', login);
}

module.exports = route;