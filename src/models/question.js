'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.test, { through: models.test_detail });
            this.belongsTo(models.subject);
        }
    }
    question.init({
        question_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        question_content: DataTypes.STRING,
        answer_one: DataTypes.STRING,
        answer_two: DataTypes.STRING,
        answer_three: DataTypes.STRING,
        answer_four: DataTypes.STRING,
        answer_correct: DataTypes.STRING,
        createby: DataTypes.STRING,
        question_grade: DataTypes.STRING,
        question_term: DataTypes.STRING,
        question_state: DataTypes.TINYINT
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'question',
    });
    return question;
};