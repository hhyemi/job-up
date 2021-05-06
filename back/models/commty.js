const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Commty extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT
        },
        views: {
          type: DataTypes.INTEGER(5),
          allowNull: false
        }
      },
      {
        modelName: 'Commty',
        tableName: 'commty',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Commty.belongsTo(db.User);
    db.Commty.hasMany(db.Comment);
    db.Commty.belongsToMany(db.Hashtag, { through: 'CommtyHashtag' });
    db.Commty.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  }
};
