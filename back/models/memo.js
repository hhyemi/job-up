const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Memo extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        content: {
          type: DataTypes.BLOB,
          allowNull: false
        },
        bookmark: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        modelName: 'Memo',
        tableName: 'memo',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Memo.belongsTo(db.User);
  }
};
