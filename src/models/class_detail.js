'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class class_detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.nguoidung);
            this.belongsTo(models.classes);
        }
    }
    class_detail.init({
        class_detail_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'class_detail',
    });
    return class_detail;
};