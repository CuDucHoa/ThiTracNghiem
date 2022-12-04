'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subject', {
            subject_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            subject_name: {
                type: Sequelize.STRING
            },
            subject_state: {
                type: Sequelize.BOOLEAN
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('subject');
    }
};