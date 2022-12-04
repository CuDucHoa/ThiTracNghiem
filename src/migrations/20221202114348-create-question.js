'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('question', {
            question_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            question_content: {
                type: Sequelize.STRING
            },
            answer_one: {
                type: Sequelize.STRING
            },
            answer_two: {
                type: Sequelize.STRING
            },
            answer_three: {
                type: Sequelize.STRING
            },
            answer_four: {
                type: Sequelize.STRING
            },
            answer_correct: {
                type: Sequelize.STRING
            },
            createby: {
                type: Sequelize.STRING
            },
            subject_id: {
                type: Sequelize.BIGINT
            },
            question_grade: {
                type: Sequelize.STRING
            },
            question_term: {
                type: Sequelize.STRING
            },
            question_state: {
                type: Sequelize.BOOLEAN
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('question');
    }
};