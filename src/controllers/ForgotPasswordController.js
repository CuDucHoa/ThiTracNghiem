const db = require('../models/index');

class ForgotPasswordController {
    getSend(req, res, next) {
        res.render('send-mail', { param: 0 });
    }
    check(req, res, next) {
        var user_id = req.body.user_id;
        var email = req.body.gmail;
        try {
            db.nguoidung.findOne({
                where: {
                    nguoidung_id: user_id,
                    nguoidung_email: email,
                    nguoidung_role: "teacher"
                }
            }).then(function(data) {
                if (data !== null) {
                    req.data = data;
                    next();
                } else res.status(200).render('send-mail', { param: 1 });
            });
        } catch (error) {
            res.status(200).redirect('/send-mail');
        }
    }
    confirmCode(req, res, next) {
        try {
            if (req.data.nguoidung_id !== null) {
                res.status(200).render('change-password', { param: 0, user_id: req.data.nguoidung_id });
            } else {
                res.status(200).render('send-mail', { param: 1 });
            }
        } catch (error) {
            res.status(200).redirect('/send-mail');
        }
    }
    getChange(req, res, next) {
        res.render('change-password', { param: 0, user_id: req.body.user_id });
    }
    confirmChange(req, res, next) {
        var user_id = req.body.user_id;
        var password = req.body.password;
        var checkPassword = req.body.checkPassword;
        try {
            db.nguoidung.findOne({
                where: {
                    nguoidung_id: user_id,
                    nguoidung_role: "teacher"
                }
            }).then(function(data) {
                if (data !== null && password === checkPassword) {
                    db.nguoidung.update({ nguoidung_password: password }, {
                        where: {
                            nguoidung_id: user_id,
                            nguoidung_role: "teacher"
                        }
                    });
                    res.status(200).redirect('/login');
                } else res.status(200).render('change-password', { param: 1, user_id: req.body.user_id })
            });
        } catch (error) {
            res.status(200).redirect('/change-password');
        }
    }
}

module.exports = new ForgotPasswordController();