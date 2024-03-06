'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Record, User }) {
      this.belongsTo(Record, { foreignKey: 'record_id' });
      this.belongsTo(User, {foreignKey: 'user_id'})
    }
  }
  Song.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      songTitle: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      duration: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      record_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Records',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE'
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
      modelName: 'Song',
    }
  );
  return Song;
};
