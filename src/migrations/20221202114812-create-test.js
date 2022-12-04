'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('test', {
            test_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            subject_id: {
                type: Sequelize.BIGINT
            },
            test_term: {
                type: Sequelize.STRING
            },
            test_date: {
                type: Sequelize.DATEONLY
            },
            test_time_start: {
                type: Sequelize.TIME
            },
            test_time_limit: {
                type: Sequelize.INTEGER
            },
            test_quantity: {
                type: Sequelize.INTEGER
            },
            test_state: {
                type: Sequelize.BOOLEAN
            },
            test_grade: {
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('test');
    }
};