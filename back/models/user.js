const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        email: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true // 고유한 값
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false // 필수
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false // 필수
        },
        src: {
          type: DataTypes.STRING(200),
          allowNull: true
        }
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Calendar);
    db.User.hasMany(db.Category);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Commty);
    db.User.hasMany(db.Todo);
    db.User.hasMany(db.Memo);
    db.User.hasMany(db.Study);
  }
};
