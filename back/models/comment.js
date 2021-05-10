const DataTypes = require('sequelize');
const { Model } = DataTypes;
const moment = require('moment');

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('createdAt')).format('YYYY/DD/MM hh:mm');
          }
        },
        updatedAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY/DD/MM hh:mm');
          }
        }
      },
      {
        modelName: 'Comment',
        tableName: 'comment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Commty);
  }
};
