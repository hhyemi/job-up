const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class CalSchedule extends Model {
  static init(sequelize) {
    return super.init(
      {
        calendarId: {
          type: DataTypes.INTEGER(10),
          allowNull: false
        },
        category: {
          type: DataTypes.STRING(10),
          allowNull: false
        },
        isVisible: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        title: {
          type: DataTypes.INTEGER(30),
          allowNull: false
        },
        start: {
          type: DataTypes.DATE,
          allowNull: false
        },
        end: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        modelName: 'CalSchedule',
        tableName: 'cal_sch',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.CalSchedule.belongsTo(db.CalPurpose);
    db.CalSchedule.belongsTo(db.User);
  }
};
