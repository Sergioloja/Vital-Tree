const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Educational_contentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const educational_contents = await db.educational_contents.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        content: data.content || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await educational_contents.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.educational_contents.getTableName(),
        belongsToColumn: 'images',
        belongsToId: educational_contents.id,
      },
      data.images,
      options,
    );

    return educational_contents;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const educational_contentsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      content: item.content || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const educational_contents = await db.educational_contents.bulkCreate(
      educational_contentsData,
      { transaction },
    );

    // For each item created, replace relation files

    for (let i = 0; i < educational_contents.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.educational_contents.getTableName(),
          belongsToColumn: 'images',
          belongsToId: educational_contents[i].id,
        },
        data[i].images,
        options,
      );
    }

    return educational_contents;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const educational_contents = await db.educational_contents.findByPk(
      id,
      {},
      { transaction },
    );

    await educational_contents.update(
      {
        title: data.title || null,
        content: data.content || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await educational_contents.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.educational_contents.getTableName(),
        belongsToColumn: 'images',
        belongsToId: educational_contents.id,
      },
      data.images,
      options,
    );

    return educational_contents;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const educational_contents = await db.educational_contents.findByPk(
      id,
      options,
    );

    await educational_contents.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await educational_contents.destroy({
      transaction,
    });

    return educational_contents;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const educational_contents = await db.educational_contents.findOne(
      { where },
      { transaction },
    );

    if (!educational_contents) {
      return educational_contents;
    }

    const output = educational_contents.get({ plain: true });

    output.images = await educational_contents.getImages({
      transaction,
    });

    output.organization = await educational_contents.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.file,
        as: 'images',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('educational_contents', 'title', filter.title),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'educational_contents',
            'content',
            filter.content,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.educational_contents.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.educational_contents.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('educational_contents', 'title', query),
        ],
      };
    }

    const records = await db.educational_contents.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
