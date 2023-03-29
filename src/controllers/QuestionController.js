const { Sequelize } = require('../models/index');
const db = require('../models/index');
class QuestionController {
    async getQuestionList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const list_question = await db.question.findAll({
                    where: { subjectSubjectId: req.params.id }
                });
                return res.status(200).render('question-list', { list_subject: list_subject, user_data: cookieData, list_question: list_question });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getQuestionDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const question = await db.question.findOne({
                    where: {
                        question_id: req.params.id
                    },
                    include: [{
                        model: db.subject,
                        where: { subject_state: '1' },
                        attributes: []
                    }],
                    attributes: [
                        'question_id', 'question_content', 'answer_one', 'answer_two', 'answer_three', 'answer_four', 'answer_correct', 'createby', 'question_grade', 'question_term', 'question_state', 'subjectSubjectId', Sequelize.col('subject.subject_name', 'subject_name')
                    ],
                    raw: true
                });
                if (cookieData.nguoidung_id === question.createby) {
                    return res.status(200).render('change-question-information', { list_subject: list_subject, user_data: cookieData, question: question, true_creator: 1 });
                } else {
                    return res.status(200).render('change-question-information', { list_subject: list_subject, user_data: cookieData, question: question, true_creator: 0 });
                }

            } catch (error) {
                res.json(error);
            }
        }
    }
    async postQuestionDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const question = await db.question.findOne({ where: { question_id: req.body.id } });
                return res.status(200).render('change-question-information', { list_subject: list_subject, user_data: cookieData, question: question });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getCreateQuestion(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-question', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postCreateQuestion(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-question', { list_subject: list_subject, user_data: cookieData });
            } catch (error) {
                res.json(error);
            }
        }
    }
}

module.exports = new QuestionController();