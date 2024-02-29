'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      
    }
  }
  Chat.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sender_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipient_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    message: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};