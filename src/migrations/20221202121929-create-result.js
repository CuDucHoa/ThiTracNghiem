'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('result', {
            nguoidung_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            test_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            users_score: {
                type: Sequelize.FLOAT
            },
            test_state: {
                type: Sequelize.BOOLEAN
            },
            test_finish_time: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('result');
    }
};