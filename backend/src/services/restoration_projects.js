const db = require('../db/models');
const Restoration_projectsDBApi = require('../db/api/restoration_projects');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const axios = require('axios');
const config = require('../config');
const stream = require('stream');

module.exports = class Restoration_projectsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Restoration_projectsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async bulkImport(req, res, sendInvitationEmails = true, host) {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new stream.PassThrough();
      const results = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await Restoration_projectsDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let restoration_projects = await Restoration_projectsDBApi.findBy(
        { id },
        { transaction },
      );

      if (!restoration_projects) {
        throw new ValidationError('restoration_projectsNotFound');
      }

      await Restoration_projectsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return restoration_projects;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (
        currentUser.app_role?.name !== config.roles.admin &&
        currentUser.app_role?.name !== config.roles.super_admin
      ) {
        throw new ValidationError('errors.forbidden.message');
      }

      await Restoration_projectsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
