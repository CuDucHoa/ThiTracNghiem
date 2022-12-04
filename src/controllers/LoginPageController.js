const db = require('../models/index');
const jwt = require('jsonwebtoken');

class LoginPageController {
    get(req, res, next) {
        if (req.cookies.token !== null || req.cookies !== undefined) {
            res.status(200).redirect('/home');
        } else res.render('login', { checkPass: 0 });
    }
    async login(req, res, next) {
        var userId = req.body.userId;
        var password = req.body.password;
        try {
            const Login = await db.nguoidung.findOne({
                where: {
                    nguoidung_id: userId,
                    nguoidung_password: password,
                    nguoidung_state: '1'
                }
            });
            if (Login) {
                const payload = { nguoidungId: Login.nguoidung_id };
                const token = jwt.sign(payload, 'SECRETKEY', {
                    expiresIn: '5h'
                });
                res.cookie('token', token);
                next();
            } else {
                res.status(200).render('login', { checkPass: 1 });
            }
        } catch (error) {
            res.status(200).redirect('/login');
        }
    }
    isAuthenticated(req, res, next) {
        try {
            const token = req.cookies.token;
            jwt.verify(token, 'SECRETKEY', function(error, payload) {
                if (error) {
                    res.status(200).redirect('/login');
                } else {
                    // find
                    db.nguoidung.findOne({
                        where: {
                            nguoidung_id: payload.nguoidungId
                        }
                    }).then(function(user) {
                        if (user !== null) {
                            req.data = user;
                            next();
                        } else {
                            res.status(200).redirect('/login');
                        }
                    });
                }
            });
        } catch (err) {
            res.status(200).redirect('/login');
        }
    }
    checkRole(req, res, next) {
        if (req.data.nguoidung_role === "student") {
            res.cookie('data', req.data);
            res.status(200).redirect('/home');
        } else if (req.data.nguoidung_role === "teacher") {
            res.cookie('data', req.data);
            res.status(200).redirect('/home');
        } else {
            res.cookie('data', req.data);
            res.status(200).redirect('/home');
        }
    }
    logout(req, res, next) {
        res.clearCookie('token');
        res.status(200).redirect('/login');
    }
}

module.exports = new LoginPageController();