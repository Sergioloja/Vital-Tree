const db = require('../db/models');
const Educational_contentsDBApi = require('../db/api/educational_contents');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const axios = require('axios');
const config = require('../config');
const stream = require('stream');

module.exports = class Educational_contentsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Educational_contentsDBApi.create(data, {
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

      await Educational_contentsDBApi.bulkImport(results, {
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
      let educational_contents = await Educational_contentsDBApi.findBy(
        { id },
        { transaction },
      );

      if (!educational_contents) {
        throw new ValidationError('educational_contentsNotFound');
      }

      await Educational_contentsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return educational_contents;
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

      await Educational_contentsDBApi.remove(id, {
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
