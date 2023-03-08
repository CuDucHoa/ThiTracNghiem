'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class classes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.nguoidung, { through: models.class_detail });
        }
    }
    classes.init({
        class_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        class_name: DataTypes.STRING,
        class_year: DataTypes.STRING,
        class_grade: DataTypes.STRING,
        class_state: DataTypes.TINYINT
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'classes',
    });


    return classes;
};