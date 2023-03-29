const { Sequelize } = require('sequelize');
const db = require('../models/index');

class TestController {
    async getTestList(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    const test_list = await db.test.findAll({
                        include: [{
                            model: db.subject,
                            attributes: [],
                        }],
                        attributes: [
                            'test_id', 'test_term', 'test_date', 'test_time_start', 'test_time_limit', 'test_quantity', 'test_state', 'test_grade', Sequelize.col('subject.subject_name', 'subject_name')
                        ],
                        raw: true
                    });
                    return res.status(200).render('test-list', { list_subject: list_subject, user_data: cookieData, test_list: test_list });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getTestDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                if (list_subject.length > 0) {
                    const test = await db.test.findOne({
                        where: {
                            test_id: req.params.id
                        },
                        include: [{
                            model: db.subject,
                            attributes: [],
                        }],
                        attributes: [
                            'test_id', 'test_term', 'test_date', 'test_time_start', 'test_time_limit', 'test_quantity', 'test_state', 'test_grade', Sequelize.col('subject.subject_id', 'subject_id'), Sequelize.col('subject.subject_name', 'subject_name')
                        ],
                        raw: true
                    });
                    const list_question = await db.test_detail.findAll({
                        where: { testTestId: test.test_id },
                        include: [{
                            model: db.question,
                            attributes: []
                        }],
                        attributes: [Sequelize.col('question.question_content', 'question_content'), Sequelize.col('question.answer_one', 'answer_one'), Sequelize.col('question.answer_two', 'answer_two'), Sequelize.col('question.answer_three', 'answer_three'), Sequelize.col('question.answer_four', 'answer_four'), Sequelize.col('question.answer_correct', 'answer_correct')]
                    })
                    return res.status(200).render('test-detail', { list_subject: list_subject, user_data: cookieData, test: test, list_question: list_question });
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postTestDetail(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                const test = await db.test.findOne({
                    where: {
                        test_id: req.params.id
                    },
                    include: [{
                        model: db.subject,
                        attributes: [],
                    }],
                    attributes: [
                        'test_id', 'test_term', 'test_date', 'test_time_start', 'test_time_limit', 'test_quantity', 'test_state', 'test_grade', Sequelize.col('subject.subject_id', 'subject_id'), Sequelize.col('subject.subject_name', 'subject_name')
                    ],
                    raw: true
                });
                const list_question = await db.test_detail.findAll({
                    where: { testTestId: test.test_id },
                    include: [{
                        model: db.question,
                        attributes: []
                    }],
                    attributes: [Sequelize.col('question.question_content', 'question_content'), Sequelize.col('question.answer_one', 'answer_one'), Sequelize.col('question.answer_two', 'answer_two'), Sequelize.col('question.answer_three', 'answer_three'), Sequelize.col('question.answer_four', 'answer_four'), Sequelize.col('question.answer_correct', 'answer_correct')]
                })
                return res.status(200).render('test-detail', { list_subject: list_subject, user_data: cookieData, test: test, list_question: list_question });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getCreateTest(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                return res.status(200).render('create-test', { user_data: cookieData, list_subject: list_subject, param: 0 });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postCreateTest(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const cookieData = req.cookies.data;
                const list_subject = await db.subject.findAll({});
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                const test_date = req.body.test_date;
                const test_quantity = req.body.test_quantity;
                const list_question = await db.question.findAll({
                    where: {
                        subjectSubjectId: req.body.subject_id,
                        question_grade: req.body.test_grade,
                        question_state: '1'
                    }
                });
                if (test_date < date) {
                    return res.status(200).render('create-test', { user_data: cookieData, list_subject: list_subject, param: 1 });
                } else if (test_quantity > list_question.length) {
                    return res.status(200).render('create-test', { user_data: cookieData, list_subject: list_subject, param: 2 });
                } else {
                    const new_test = await db.test.create({
                        subjectSubjectId: req.body.subject_id,
                        test_grade: req.body.test_grade,
                        test_term: req.body.test_term,
                        test_date: test_date,
                        test_time_start: req.body.test_time_start,
                        test_time_limit: req.body.test_time_limit,
                        test_quantity: test_quantity,
                        test_state: "Chưa duyệt"
                    });
                    var r, p;
                    for (var i = 0; i < test_quantity; i++) {
                        r = Math.floor(Math.random() * (list_question.length - 1));
                        p = list_question[r].question_id;
                        const check_question = await db.test_detail.findOne({
                            where: {
                                testTestId: test.test_id,
                                questionQuestionId: p
                            }
                        })
                        if (check_question.length > 0) {
                            await db.test_detail.create({
                                testTestId: test.test_id,
                                questionQuestionId: p
                            })
                        } else {
                            i--;
                        }
                    }
                    return res.status(200).redirect('/test-list');
                }
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getDoTest(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                const user_data = await db.nguoidung.findOne({
                    where: {
                        nguoidung_id: req.cookies.data.nguoidung_id
                    },
                    include: [{
                        model: db.classes,
                        attributes: [],
                        as: 'classes'
                    }],
                    attributes: [
                        'nguoidung_id', 'nguoidung_full_name', Sequelize.col('classes.class_name', 'class_name')
                    ],
                    raw: true
                });
                const list_question = await db.question.findAll({
                    where: {
                        question_state: 1
                    },
                    include: [{
                        model: db.test,
                        where: {
                            test_state: 1,
                            test_id: req.params.id
                        },
                        attributes: []
                    }],
                    attributes: [
                        'question_id', 'question_content', 'answer_one', 'answer_two', 'answer_three', 'answer_four'
                    ],
                    raw: true
                });
                const test = await db.test.findOne({
                    where: {
                        test_state: 1,
                        test_id: req.params.id
                    }
                });
                return res.status(200).render('do-test', { user_data: user_data, list_question: list_question, test: test });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async postDoTest(req, res, next) {
        const checkToken = req.cookies.token;
        if (req.cookies.token === undefined) {
            res.status(200).redirect('/login');
        } else {
            try {
                var today = new Date();
                var finish_test_date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '  ' + today.getHours() + ":" + today.getMinutes();
                var listAnswerResult = new Array();
                var correctAnswer = 0;
                const list_question = await db.question.findAll({
                    where: {
                        question_state: 1
                    },
                    include: [{
                        model: db.test,
                        where: {
                            test_state: 1,
                            test_id: req.body.test_id
                        },
                        attributes: []
                    }],
                    attributes: [
                        'question_id', 'question_content', 'answer_one', 'answer_two', 'answer_three', 'answer_four', 'answer_correct'
                    ],
                    raw: true
                });
                for (var i = 0; i < list_question.length; i++) {
                    if (list_question[i].answer_correct === req.body[i]) {
                        listAnswerResult.push(1);
                        correctAnswer = correctAnswer + 1;
                    } else {
                        listAnswerResult.push(0);
                    }
                }
                var score = (correctAnswer * 10 / list_question.length);
                await db.result.create({
                    nguoidungNguoidungId: req.cookies.data.nguoidung_id,
                    testTestId: req.body.test_id,
                    users_score: score,
                    test_state: 1,
                    test_finish_time: finish_test_date
                })
                res.cookie('listAnswerResult', listAnswerResult);
                return res.redirect('/result/' + req.body.test_id);
            } catch (error) {
                res.json(error);
            }
        }
    }
}
module.exports = new TestController();