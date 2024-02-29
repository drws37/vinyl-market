'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordsComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Record }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Record, { foreignKey: 'record_id' });
    }
  }
  RecordsComment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Records',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'RecordsComment',
    }
  );
  return RecordsComment;
};
