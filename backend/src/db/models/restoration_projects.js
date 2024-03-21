const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const restoration_projects = sequelize.define(
    'restoration_projects',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      project_name: {
        type: DataTypes.TEXT,
      },

      funding_goal: {
        type: DataTypes.DECIMAL,
      },

      current_funding: {
        type: DataTypes.DECIMAL,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
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

  restoration_projects.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.restoration_projects.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.restoration_projects.hasMany(db.file, {
      as: 'images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.restoration_projects.getTableName(),
        belongsToColumn: 'images',
      },
    });

    db.restoration_projects.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.restoration_projects.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return restoration_projects;
};
