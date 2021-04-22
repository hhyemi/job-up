const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Calendar extends Model {
  static init(sequelize) {
    return super.init(
      {
        calendarId: {
          type: DataTypes.STRING(10),
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
          type: DataTypes.STRING(30),
          allowNull: false
        },
        location: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        state: {
          type: DataTypes.STRING(10),
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
        modelName: 'Calendar',
        tableName: 'calendar',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Calendar.belongsTo(db.Category);
    db.Calendar.belongsTo(db.User);
  }
};
