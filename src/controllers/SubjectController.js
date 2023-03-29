const db = require('../models/index');
class SubjectController {
    async getSubjectList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('subject-list', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getSubjectDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const subject = await db.subject.findOne({ where: { subject_id: req.params.id } });
                return res.status(200).render('change-subject-information', { list_subject: list_subject, user_data: cookieData, subject: subject });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postSubjectDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const subject = await db.subject.findOne({ where: { subject_id: req.body.id } });
                return res.status(200).render('change-subject-information', { list_subject: list_subject, user_data: cookieData, subject: subject });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getCreateSubject(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-subject', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postCreateSubject(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-subject', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
}

module.exports = new SubjectController();