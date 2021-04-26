const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Todo extends Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: DataTypes.CHAR(1),
          allowNull: false
        },
        sequence: {
          type: DataTypes.INTEGER(50),
          allowNull: false
        },
        title: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT
        },
        deadline: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        modelName: 'Todo',
        tableName: 'todo',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Todo.belongsTo(db.User);
  }
};
