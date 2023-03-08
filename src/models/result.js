'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class result extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.nguoidung);
            this.belongsTo(models.test);
        }
    }
    result.init({
        result_id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        users_score: DataTypes.FLOAT,
        test_state: DataTypes.TINYINT,
        test_finish_time: DataTypes.DATE
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'result',
    });


    return result;
};