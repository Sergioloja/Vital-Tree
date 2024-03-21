const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Corporate_sponsorsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const corporate_sponsors = await db.corporate_sponsors.create(
      {
        id: data.id || undefined,

        company_name: data.company_name || null,
        industry: data.industry || null,
        csr_focus: data.csr_focus || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await corporate_sponsors.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await corporate_sponsors.setSponsored_projects(
      data.sponsored_projects || [],
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.corporate_sponsors.getTableName(),
        belongsToColumn: 'logo',
        belongsToId: corporate_sponsors.id,
      },
      data.logo,
      options,
    );

    return corporate_sponsors;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const corporate_sponsorsData = data.map((item, index) => ({
      id: item.id || undefined,

      company_name: item.company_name || null,
      industry: item.industry || null,
      csr_focus: item.csr_focus || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const corporate_sponsors = await db.corporate_sponsors.bulkCreate(
      corporate_sponsorsData,
      { transaction },
    );

    // For each item created, replace relation files

    for (let i = 0; i < corporate_sponsors.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.corporate_sponsors.getTableName(),
          belongsToColumn: 'logo',
          belongsToId: corporate_sponsors[i].id,
        },
        data[i].logo,
        options,
      );
    }

    return corporate_sponsors;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const corporate_sponsors = await db.corporate_sponsors.findByPk(
      id,
      {},
      { transaction },
    );

    await corporate_sponsors.update(
      {
        company_name: data.company_name || null,
        industry: data.industry || null,
        csr_focus: data.csr_focus || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await corporate_sponsors.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await corporate_sponsors.setSponsored_projects(
      data.sponsored_projects || [],
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.corporate_sponsors.getTableName(),
        belongsToColumn: 'logo',
        belongsToId: corporate_sponsors.id,
      },
      data.logo,
      options,
    );

    return corporate_sponsors;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const corporate_sponsors = await db.corporate_sponsors.findByPk(
      id,
      options,
    );

    await corporate_sponsors.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await corporate_sponsors.destroy({
      transaction,
    });

    return corporate_sponsors;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const corporate_sponsors = await db.corporate_sponsors.findOne(
      { where },
      { transaction },
    );

    if (!corporate_sponsors) {
      return corporate_sponsors;
    }

    const output = corporate_sponsors.get({ plain: true });

    output.logo = await corporate_sponsors.getLogo({
      transaction,
    });

    output.sponsored_projects = await corporate_sponsors.getSponsored_projects({
      transaction,
    });

    output.organization = await corporate_sponsors.getOrganization({
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
        model: db.restoration_projects,
        as: 'sponsored_projects',
        through: filter.sponsored_projects
          ? {
              where: {
                [Op.or]: filter.sponsored_projects.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.sponsored_projects ? true : null,
      },

      {
        model: db.file,
        as: 'logo',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.company_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'corporate_sponsors',
            'company_name',
            filter.company_name,
          ),
        };
      }

      if (filter.industry) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'corporate_sponsors',
            'industry',
            filter.industry,
          ),
        };
      }

      if (filter.csr_focus) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'corporate_sponsors',
            'csr_focus',
            filter.csr_focus,
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
          count: await db.corporate_sponsors.count({
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
      : await db.corporate_sponsors.findAndCountAll({
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
          Utils.ilike('corporate_sponsors', 'company_name', query),
        ],
      };
    }

    const records = await db.corporate_sponsors.findAll({
      attributes: ['id', 'company_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['company_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.company_name,
    }));
  }
};
