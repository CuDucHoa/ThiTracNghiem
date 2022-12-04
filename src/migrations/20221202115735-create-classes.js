'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('classes', {
            class_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            class_name: {
                type: Sequelize.STRING
            },
            class_year: {
                type: Sequelize.STRING
            },
            class_state: {
                type: Sequelize.BOOLEAN
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('classes');
    }
};