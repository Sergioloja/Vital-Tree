const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const regions = sequelize.define(
    'regions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      coordinates: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  regions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.regions.hasMany(db.alerts, {
      as: 'alerts_region',
      foreignKey: {
        name: 'regionId',
      },
      constraints: false,
    });

    //end loop

    db.regions.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.regions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.regions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return regions;
};
