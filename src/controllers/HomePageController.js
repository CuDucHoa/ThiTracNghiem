const db = require('../models/index');

class HomePageController {
    async index(req, res, next) {
        const checkToken = req.cookies.token;
        console.log(checkToken);
        if (req.cookies.token === null || req.cookies === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                var data = db.nguoidung.findOne({ where: { nguoidung_id: req.cookies.data.nguoidung_id } });
                if (data.nguoidung_roles === "student") {
                    const classes_detail = await db.class_detail.findAll({
                        where: {
                            nguoidung_id: data.nguoidung_id
                        }
                    }).then(function(class_detail) {
                        db.classes.findAll({
                            where: {
                                class_id: class_detail.class_id,
                                class_state: '1'
                            }
                        })
                    });
                    res.cookie('className', classes_detail.class_name);
                    res.status(200).render('student-homepage', { userName: data.nguoidung_full_name });
                } else res.status(200).render('student-homepage', { userName: data.nguoidung_full_name });
            } catch (err) {
                res.status(200).redirect('/home');
            }
        }
    }
}

module.exports = new HomePageController();