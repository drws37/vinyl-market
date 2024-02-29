'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, SellersComment }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(SellersComment, { foreignKey: 'seller_id' });
    }
  }
  Seller.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phone: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      adress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      itn: {
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
      modelName: 'Seller',
    }
  );
  return Seller;
};
