'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('class_detail', {
            class_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            nguoidung_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('class_detail');
    }
};