'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Record }) {
      this.belongsTo(Record, { foreignKey: 'record_id' });
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
