const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true
        },
        bgColor: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        borderColor: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        dragBgColor: {
          type: DataTypes.STRING(30),
          allowNull: false
        }
      },
      {
        modelName: 'Category',
        tableName: 'category',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Calendar);
    db.Category.belongsTo(db.User);
  }
};
