'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('test_detail', {
            test_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            question_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('test_detail');
    }
};