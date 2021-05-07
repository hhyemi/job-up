const DataTypes = require('sequelize');
const { Model } = DataTypes;
const moment = require('moment');

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
        },
        createdAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('createdAt')).format('YYYY/DD/MM hh:mm:ss');
          }
        },
        updatedAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY/DD/MM hh:mm:ss');
          }
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
