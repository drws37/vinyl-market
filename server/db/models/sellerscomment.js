'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellersComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Seller }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Seller, { foreignKey: 'seller_id' });
    }
  }
  SellersComment.init(
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
      seller_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      modelName: 'SellersComment',
    }
  );
  return SellersComment;
};
