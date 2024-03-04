'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Seller, Record, Chat, Favorite}) {
      this.hasOne(Seller, {foreignKey: 'user_id'})
      this.hasMany(Record, {foreignKey: 'user_id'})
      this.hasMany(Chat, {as: 'SenderUser',foreignKey: 'sender_id'})
      this.hasMany(Chat, {as: 'RecipientUser', foreignKey: 'recipient_id'})
      this.hasMany(Favorite, {foreignKey: 'user_id'})

    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    role: {
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
    modelName: 'User',
  });
  return User;
};