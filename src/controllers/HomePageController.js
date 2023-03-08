const { Op } = require('sequelize');
const { Sequelize } = require('../models/index');
const db = require('../models/index');

class HomePageController {
    async index(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                // var time = today.getHours() + ":" + today.getMinutes();
                var time = ('10:00');
                if (cookieData.nguoidung_role === 'student') {
                    const student_data = await db.nguoidung.findOne({
                        where: {
                            nguoidung_id: cookieData.nguoidung_id
                        },
                        include: [{
                            model: db.classes,
                            attributes: [],
                            as: 'classes'
                        }],
                        attributes: [
                            'nguoidung_id', Sequelize.col('classes.class_grade', 'class_grade')
                        ],
                        raw: true
                    });
                    const list_result = await db.result.findAll({
                        where: {
                            nguoidungNguoidungId: student_data.nguoidung_id,
                            test_state: 1
                        }
                    });
                    if (list_result.length === 0) {
                        list_result.nguoidungNguoidungId = '';
                    }
                    const list_test_today = await db.test.findAll({
                        where: {
                            test_state: '1',
                            test_grade: student_data.class_grade,
                            test_date: date,
                            test_time_start: time,
                            test_id: {
                                [Op.ne]: list_result.nguoidungNguoidungId
                            }
                        }
                    });
                    return res.status(200).render('student-homepage', { user_data: cookieData, list_test_today: list_test_today });
                } else if (cookieData.nguoidung_role === 'teacher') {
                    return res.status(200).redirect('/account-list/student');
                } else {
                    return res.status(200).redirect('/account-list/teacher');
                }
            } catch (err) {
                //return res.status(200).render('student-homepage', { user_name: data.nguoidung_full_name, list_test_today: [] });
                res.send(err);
            }
        }
    }
}

module.exports = new HomePageController();