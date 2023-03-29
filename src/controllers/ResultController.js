const { Sequelize } = require('../models/index');
const db = require('../models/index');
class ResultController {
    async getResultList(req, res, next) {
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
                const list_result = await db.result.findAll({
                    include: [{
                        model: db.test,
                        attributes: []
                    }],
                    attributes: [
                        'users_score', Sequelize.col('test.test_term', 'test_term'), Sequelize.col('test.test_date', 'test_date'), Sequelize.col('test.test_grade', 'test_grade'), Sequelize.col('test.subjectSubjectId', 'subject_id')
                    ],
                    raw: true
                });
                return res.status(200).render('result-list', { user_data: user_data, list_result: list_result });
            } catch (error) {
                res.json(error);
            }
        }
    }
    async getTestResult(req, res, next) {
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
                const test = await db.test.findOne({
                    where: {
                        test_state: 1,
                        test_id: req.params.id
                    }
                });
                const result = await db.result.findOne({
                    where: {
                        test_state: 1,
                        testTestId: req.params.id,
                        nguoidungNguoidungId: req.cookies.data.nguoidung_id
                    }
                });
                const listAnswerResult = req.cookies.listAnswerResult;
                return res.status(200).render('result', { user_data: user_data, test: test, result: result, listAnswerResult: listAnswerResult });
            } catch (error) {
                res.json(error);
            }
        }
    }
}
module.exports = new ResultController();