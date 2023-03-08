'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('nguoidung', {
            nguoidung_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            nguoidung_password: {
                type: Sequelize.STRING
            },
            nguoidung_full_name: {
                type: Sequelize.STRING
            },
            nguoidung_email: {
                type: Sequelize.STRING
            },
            nguoidung_phone_number: {
                type: Sequelize.STRING
            },
            nguoidung_role: {
                type: Sequelize.STRING
            },
            nguoidung_date_of_birth: {
                type: Sequelize.DATEONLY
            },
            nguoidung_address: {
                type: Sequelize.STRING
            },
            nguoidung_gender: {
                type: Sequelize.STRING
            },
            nguoidung_image: {
                type: Sequelize.STRING
            },
            nguoidung_state: {
                type: Sequelize.TINYINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('nguoidung');
    }
};