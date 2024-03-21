const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const alerts = sequelize.define(
    'alerts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      alert_time: {
        type: DataTypes.DATE,
      },

      description: {
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

  alerts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.alerts.belongsTo(db.regions, {
      as: 'region',
      foreignKey: {
        name: 'regionId',
      },
      constraints: false,
    });

    db.alerts.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.alerts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.alerts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return alerts;
};
