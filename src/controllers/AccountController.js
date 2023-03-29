const { Sequelize } = require('sequelize');
const db = require('../models/index');

class AccountController {
    async getTeacherAccountList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const list_class = await db.classes.findAll({});
                if (list_subject.length > 0) {
                    const list_account = await db.nguoidung.findAll({
                        where: {
                            nguoidung_role: 'teacher',
                        },
                        include: [{
                            model: db.classes,
                            where: { class_state: '1' },
                            attributes: []
                        }],
                        attributes: [
                            'nguoidung_id', 'nguoidung_password', 'nguoidung_full_name', 'nguoidung_email', 'nguoidung_phone_number', 'nguoidung_role', 'nguoidung_date_of_birth', 'nguoidung_address', 'nguoidung_gender', 'nguoidung_image', 'nguoidung_state', Sequelize.col('classes.class_name', 'class_name'),
                            Sequelize.col('classes.class_year', 'class_year')
                        ],
                        raw: true
                    });
                    if (list_account.length > 0) {
                        return res.status(200).render('account-list', { user_role: 'teacher', user_name: cookieData.nguoidung_full_name, Role: cookieData.nguoidung_role, list_subject: list_subject, list_account: list_account, list_class: list_class });
                    }
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getStudentAccountList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    const list_account = await db.nguoidung.findAll({
                        where: {
                            nguoidung_role: 'student'
                        },
                        include: [{
                            model: db.classes,
                            where: { class_state: '1' },
                            attributes: []
                        }],
                        attributes: [
                            'nguoidung_id', 'nguoidung_password', 'nguoidung_full_name', 'nguoidung_email', 'nguoidung_phone_number', 'nguoidung_role', 'nguoidung_date_of_birth', 'nguoidung_address', 'nguoidung_gender', 'nguoidung_image', 'nguoidung_state', Sequelize.col('classes.class_name', 'class_name'),
                            Sequelize.col('classes.class_year', 'class_year')
                        ],
                        raw: true
                    });
                    if (list_account.length > 0) {
                        return res.status(200).render('account-list', { user_role: 'student', user_name: cookieData.nguoidung_full_name, Role: cookieData.nguoidung_role, list_subject: list_subject, list_account: list_account });
                    }
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getAccountInfo(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    const user_data = await db.nguoidung.findOne({
                        where: { nguoidung_id: cookieData.nguoidung_id },
                        include: [{
                            model: db.classes,
                            where: { class_state: '1' },
                            attributes: [],
                            as: 'classes'
                        }],
                        attributes: [
                            'nguoidung_id', 'nguoidung_password', 'nguoidung_full_name', 'nguoidung_email', 'nguoidung_phone_number', 'nguoidung_role', 'nguoidung_date_of_birth', 'nguoidung_address', 'nguoidung_gender', 'nguoidung_image', 'nguoidung_state', Sequelize.col('classes.class_name', 'class_name'),
                            Sequelize.col('classes.class_year', 'class_year')
                        ],
                        raw: true
                    });
                    return res.status(200).render('account-information', { user_role: cookieData.nguoidung_role, list_subject: list_subject, success: 0, user_data: user_data });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getCreateAccount(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const class_list = await db.classes.findAll({});
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    return res.status(200).render('create-account', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, param: 1, list_class: class_list });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postCreateAccount(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const class_list = await db.classes.findAll({});
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    db.nguoidung.create({
                        nguoidung_id: req.body.nguoidung_id,
                        nguoidung_password: req.body.nguoidung_password,
                        nguoidung_full_name: req.body.nguoidung_full_name,
                        nguoidung_email: req.body.nguoidung_email,
                        nguoidung_phone_number: req.body.nguoidung_phone_number,
                        nguoidung_role: req.body.nguoidung_role,
                        nguoidung_date_of_birth: req.body.nguoidung_date_of_birth,
                        nguoidung_address: req.body.nguoidung_address,
                        nguoidung_gender: req.body.nguoidung_gender,
                        nguoidung_image: req.body.nguoidung_image,
                        nguoidung_state: req.body.nguoidung_state,
                        class_detail: [
                            { nguoidungNguoidungId: req.body.nguoidung_id },
                            { classClassId: req.body.class_id }
                        ]
                    }, {
                        include: [class_detail]
                    }).then(function(result) {
                        return res.redirect('/home');
                    }).catch(function(err) {
                        return res.status(200).render('create-account', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, param: 0, list_class: class_list });
                    })
                } else {
                    return res.status(200).render('create-account', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, param: 0, list_class: class_list });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getUpdateAccount(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const list_result = await db.result.findAll({
                    where: {
                        nguoidungNguoidungId: req.params.id
                    }
                });
                if (list_subject.length > 0) {
                    const account_data = await db.nguoidung.findOne({
                        where: { nguoidung_id: req.params.id },
                        include: [{
                            model: db.classes,
                            where: { class_state: '1' },
                            attributes: [],
                            as: 'classes'
                        }],
                        attributes: [
                            'nguoidung_id', 'nguoidung_password', 'nguoidung_full_name', 'nguoidung_email', 'nguoidung_phone_number', 'nguoidung_role', 'nguoidung_date_of_birth', 'nguoidung_address', 'nguoidung_gender', 'nguoidung_image', 'nguoidung_state', Sequelize.col('classes.class_id', 'class_id'), Sequelize.col('classes.class_name', 'class_name'),
                            Sequelize.col('classes.class_year', 'class_year')
                        ],
                        raw: true
                    });
                    const list_class = await db.classes.findAll({
                        where: { class_state: 1 }
                    });
                    if (list_class.length > 0) {
                        return res.status(200).render('change-account-information', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, list_result: list_result, list_class: list_class, account_data: account_data });
                    }
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postUpdateAccount(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_class = await db.classes.findAll({});
                const list_subject = await db.subject.findAll({});
                const account_data = await db.nguoidung.findOne({
                    where: { nguoidung_id: req.body.nguoidung_id },
                    include: [{
                        model: db.classes,
                        where: { class_state: '1' },
                        attributes: []
                    }],
                    attributes: [
                        'nguoidung_id', 'nguoidung_password', 'nguoidung_full_name', 'nguoidung_email', 'nguoidung_phone_number', 'nguoidung_role', 'nguoidung_date_of_birth', 'nguoidung_address', 'nguoidung_gender', 'nguoidung_image', 'nguoidung_state', Sequelize.col('classes.class_id', 'class_id'), Sequelize.col('classes.class_name', 'class_name'),
                        Sequelize.col('classes.class_year', 'class_year')
                    ],
                    raw: true
                });
                if (list_subject.length > 0) {
                    var user_image = req.body.nguoidung_image;
                    if (user_image === null) {
                        user_image = 'images/userImageDefault.png';
                    }
                    await db.nguoidung.update({
                        nguoidung_full_name: req.body.nguoidung_full_name,
                        nguoidung_email: req.body.nguoidung_email,
                        nguoidung_phone_number: req.body.nguoidung_phone_number,
                        nguoidung_date_of_birth: req.body.nguoidung_date_of_birth,
                        nguoidung_address: req.body.nguoidung_address,
                        nguoidung_gender: req.body.nguoidung_gender,
                        nguoidung_image: user_image,
                        nguoidung_state: req.body.nguoidung_state,
                        where: {
                            nguoidung_id: req.body.nguoidung_id
                        }
                    }).then(async function(result) {
                        await db.class_detail.update({
                            where: {
                                nguoidungNguoidungId: req.body.nguoidung_id
                            },
                            classClassId: req.body.class_id
                        }).then(function(result1) { return res.redirect('/home'); }).catch(function(err1) {
                            return res.status(200).render('change-account-information', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, list_class: list_class, account_data: account_data });
                        })
                    }).catch(function(err) {
                        return res.status(200).render('change-account-information', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, list_class: list_class, account_data: account_data });
                    })
                } else {
                    return res.status(200).render('change-account-information', { user_name: cookieData.nguoidung_full_name, user_role: cookieData.nguoidung_role, list_subject: list_subject, list_class: list_class, account_data: account_data });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
}

module.exports = new AccountController();