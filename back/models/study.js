const DataTypes = require('sequelize');
const { Model } = DataTypes;
const moment = require('moment');

module.exports = class Study extends Model {
  static init(sequelize) {
    return super.init(
      {
        time: {
          type: DataTypes.INTEGER(10),
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('createdAt')).format('YYYY.MM.DD HH:mm');
          }
        },
        updatedAt: {
          type: DataTypes.DATE,
          get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY.MM.DD HH:mm');
          }
        }
      },
      {
        modelName: 'Study',
        tableName: 'study',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize
      }
    );
  }
  static associate(db) {
    db.Study.belongsTo(db.User);
  }
};
