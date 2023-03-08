'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class test extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.nguoidung, { through: models.result });
            this.belongsToMany(models.question, { through: models.test_detail });
            this.belongsTo(models.subject);
        }
    }
    test.init({
        test_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        test_term: DataTypes.STRING,
        test_date: DataTypes.DATEONLY,
        test_time_start: DataTypes.TIME,
        test_time_limit: DataTypes.INTEGER,
        test_quantity: DataTypes.INTEGER,
        test_state: DataTypes.TINYINT,
        test_grade: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'test',
    });
    return test;
};