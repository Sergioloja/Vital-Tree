const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Restoration_projectsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const restoration_projects = await db.restoration_projects.create(
      {
        id: data.id || undefined,

        project_name: data.project_name || null,
        funding_goal: data.funding_goal || null,
        current_funding: data.current_funding || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await restoration_projects.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.restoration_projects.getTableName(),
        belongsToColumn: 'images',
        belongsToId: restoration_projects.id,
      },
      data.images,
      options,
    );

    return restoration_projects;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const restoration_projectsData = data.map((item, index) => ({
      id: item.id || undefined,

      project_name: item.project_name || null,
      funding_goal: item.funding_goal || null,
      current_funding: item.current_funding || null,
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const restoration_projects = await db.restoration_projects.bulkCreate(
      restoration_projectsData,
      { transaction },
    );

    // For each item created, replace relation files

    for (let i = 0; i < restoration_projects.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.restoration_projects.getTableName(),
          belongsToColumn: 'images',
          belongsToId: restoration_projects[i].id,
        },
        data[i].images,
        options,
      );
    }

    return restoration_projects;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const restoration_projects = await db.restoration_projects.findByPk(
      id,
      {},
      { transaction },
    );

    await restoration_projects.update(
      {
        project_name: data.project_name || null,
        funding_goal: data.funding_goal || null,
        current_funding: data.current_funding || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await restoration_projects.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.restoration_projects.getTableName(),
        belongsToColumn: 'images',
        belongsToId: restoration_projects.id,
      },
      data.images,
      options,
    );

    return restoration_projects;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const restoration_projects = await db.restoration_projects.findByPk(
      id,
      options,
    );

    await restoration_projects.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await restoration_projects.destroy({
      transaction,
    });

    return restoration_projects;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const restoration_projects = await db.restoration_projects.findOne(
      { where },
      { transaction },
    );

    if (!restoration_projects) {
      return restoration_projects;
    }

    const output = restoration_projects.get({ plain: true });

    output.images = await restoration_projects.getImages({
      transaction,
    });

    output.organization = await restoration_projects.getOrganization({
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

      if (filter.project_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'restoration_projects',
            'project_name',
            filter.project_name,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'restoration_projects',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.funding_goalRange) {
        const [start, end] = filter.funding_goalRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            funding_goal: {
              ...where.funding_goal,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            funding_goal: {
              ...where.funding_goal,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.current_fundingRange) {
        const [start, end] = filter.current_fundingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            current_funding: {
              ...where.current_funding,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            current_funding: {
              ...where.current_funding,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.start_dateRange) {
        const [start, end] = filter.start_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dateRange) {
        const [start, end] = filter.end_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.lte]: end,
            },
          };
        }
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
          count: await db.restoration_projects.count({
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
      : await db.restoration_projects.findAndCountAll({
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
          Utils.ilike('restoration_projects', 'project_name', query),
        ],
      };
    }

    const records = await db.restoration_projects.findAll({
      attributes: ['id', 'project_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['project_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.project_name,
    }));
  }
};
