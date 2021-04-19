const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class CalPurpose extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true
        },
        color: {
          type: DataTypes.STRING(30),
          allowNull: false
        }
      },
      {
        modelName: 'CalPurpose',
        tableName: 'cal_prps',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.CalPurpose.hasMany(db.CalSchedule);
  }
};
