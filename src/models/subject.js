'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.test, { foreignKey: this.subject_id });
            this.hasMany(models.question, { foreignKey: this.subject_id });
        }
    }
    subject.init({
        subject_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        subject_name: DataTypes.STRING,
        subject_state: DataTypes.TINYINT
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'subject',
        tableName: 'subject'
    });
    return subject;
};