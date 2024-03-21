const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const organizations = sequelize.define(
    'organizations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  organizations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.organizations.hasMany(db.users, {
      as: 'users_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.alerts, {
      as: 'alerts_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.corporate_sponsors, {
      as: 'corporate_sponsors_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.educational_contents, {
      as: 'educational_contents_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.regions, {
      as: 'regions_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.restoration_projects, {
      as: 'restoration_projects_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    //end loop

    db.organizations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.organizations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return organizations;
};
