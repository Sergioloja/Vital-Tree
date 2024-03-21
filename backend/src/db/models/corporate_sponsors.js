const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const corporate_sponsors = sequelize.define(
    'corporate_sponsors',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      company_name: {
        type: DataTypes.TEXT,
      },

      industry: {
        type: DataTypes.TEXT,
      },

      csr_focus: {
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

  corporate_sponsors.associate = (db) => {
    db.corporate_sponsors.belongsToMany(db.restoration_projects, {
      as: 'sponsored_projects',
      foreignKey: {
        name: 'corporate_sponsors_sponsored_projectsId',
      },
      constraints: false,
      through: 'corporate_sponsorsSponsored_projectsRestoration_projects',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.corporate_sponsors.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.corporate_sponsors.hasMany(db.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.corporate_sponsors.getTableName(),
        belongsToColumn: 'logo',
      },
    });

    db.corporate_sponsors.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.corporate_sponsors.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return corporate_sponsors;
};
