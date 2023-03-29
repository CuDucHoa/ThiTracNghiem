const db = require('../models/index');
class ClassController {
    async getClassList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const list_class = await db.classes.findAll({});
                return res.status(200).render('class-list', { list_subject: list_subject, user_data: cookieData, list_class: list_class });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getClassDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const classes = await db.classes.findOne({ where: { class_id: req.params.id } });
                return res.status(200).render('change-class-information', { list_subject: list_subject, user_data: cookieData, classes: classes });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postClassDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const classes = await db.classes.findOne({ where: { class_id: req.body.id } });
                return res.status(200).render('change-class-information', { list_subject: list_subject, user_data: cookieData, classes: classes });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getCreateClass(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-class', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postCreateClass(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-class', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
}

module.exports = new ClassController();