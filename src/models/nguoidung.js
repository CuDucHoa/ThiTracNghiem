'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nguoidung extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    nguoidung.init({
        nguoidung_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        nguoidung_password: DataTypes.STRING,
        nguoidung_full_name: DataTypes.STRING,
        nguoidung_email: DataTypes.STRING,
        nguoidung_phone_number: DataTypes.STRING,
        nguoidung_role: DataTypes.STRING,
        nguoidung_date_of_birth: DataTypes.DATEONLY,
        nguoidung_address: DataTypes.STRING,
        nguoidung_gender: DataTypes.STRING,
        nguoidung_image: DataTypes.STRING,
        nguoidung_state: DataTypes.BOOLEAN
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'nguoidung',
    });
    return nguoidung;
};