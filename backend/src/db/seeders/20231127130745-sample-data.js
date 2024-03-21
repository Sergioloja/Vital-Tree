const db = require('../models');
const Users = db.users;

const Alerts = db.alerts;

const CorporateSponsors = db.corporate_sponsors;

const EducationalContents = db.educational_contents;

const Regions = db.regions;

const RestorationProjects = db.restoration_projects;

const Organizations = db.organizations;

const AlertsData = [
  {
    alert_time: new Date('2024-01-07'),

    description: 'Your weapons, you will not need them.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-09-24'),

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-06-17'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CorporateSponsorsData = [
  {
    company_name: 'That goddamn Datamate',

    industry: 'That goddamn Datamate',

    csr_focus: 'That goddamn Datamate',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: "How 'bout them Cowboys",

    industry: "How 'bout them Cowboys",

    csr_focus: 'Like a red-headed stepchild',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'Standby',

    industry: "That's messed up",

    csr_focus: 'Texas!',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const EducationalContentsData = [
  {
    title: "That Barbala couldn't fly his way out of a wet paper bag",

    content: 'Around the survivors a perimeter create.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Reminds me of my old girlfriend Olga Goodntight',

    content: 'Always pass on what you have learned.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'That goddamn Datamate',

    content:
      'Once you start down the dark path, forever will it dominate your destiny, consume you it will.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const RegionsData = [
  {
    name: 'Pierre Simon de Laplace',

    coordinates: "That's messed up",

    // type code here for "relation_one" field
  },

  {
    name: 'Noam Chomsky',

    coordinates: 'So I was walking Oscar',

    // type code here for "relation_one" field
  },

  {
    name: 'Tycho Brahe',

    coordinates: 'That damn Bill Stull',

    // type code here for "relation_one" field
  },
];

const RestorationProjectsData = [
  {
    project_name: 'That damn gimble',

    funding_goal: 15.83,

    current_funding: 80.65,

    start_date: new Date('2024-02-05'),

    end_date: new Date('2023-09-27'),

    description:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'Texas!',

    funding_goal: 22.13,

    current_funding: 64.34,

    start_date: new Date('2024-02-14'),

    end_date: new Date('2023-06-17'),

    description:
      'Strong is Vader. Mind what you have learned. Save you it can.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'Contact the tower',

    funding_goal: 92.59,

    current_funding: 58.82,

    start_date: new Date('2023-06-18'),

    end_date: new Date('2023-11-03'),

    description: 'Hmm. In the end, cowards are those who follow the dark side.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'James Watson',
  },

  {
    name: 'Emil Fischer',
  },

  {
    name: 'Franz Boas',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

async function associateAlertWithRegion() {
  const relatedRegion0 = await Regions.findOne({
    offset: Math.floor(Math.random() * (await Regions.count())),
  });
  const Alert0 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Alert0?.setRegion) {
    await Alert0.setRegion(relatedRegion0);
  }

  const relatedRegion1 = await Regions.findOne({
    offset: Math.floor(Math.random() * (await Regions.count())),
  });
  const Alert1 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Alert1?.setRegion) {
    await Alert1.setRegion(relatedRegion1);
  }

  const relatedRegion2 = await Regions.findOne({
    offset: Math.floor(Math.random() * (await Regions.count())),
  });
  const Alert2 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Alert2?.setRegion) {
    await Alert2.setRegion(relatedRegion2);
  }
}

async function associateAlertWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Alert0 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Alert0?.setOrganization) {
    await Alert0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Alert1 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Alert1?.setOrganization) {
    await Alert1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Alert2 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Alert2?.setOrganization) {
    await Alert2.setOrganization(relatedOrganization2);
  }
}

// Similar logic for "relation_many"

async function associateCorporateSponsorWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const CorporateSponsor0 = await CorporateSponsors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CorporateSponsor0?.setOrganization) {
    await CorporateSponsor0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const CorporateSponsor1 = await CorporateSponsors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CorporateSponsor1?.setOrganization) {
    await CorporateSponsor1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const CorporateSponsor2 = await CorporateSponsors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CorporateSponsor2?.setOrganization) {
    await CorporateSponsor2.setOrganization(relatedOrganization2);
  }
}

async function associateEducationalContentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const EducationalContent0 = await EducationalContents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EducationalContent0?.setOrganization) {
    await EducationalContent0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const EducationalContent1 = await EducationalContents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EducationalContent1?.setOrganization) {
    await EducationalContent1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const EducationalContent2 = await EducationalContents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EducationalContent2?.setOrganization) {
    await EducationalContent2.setOrganization(relatedOrganization2);
  }
}

async function associateRegionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Region0 = await Regions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Region0?.setOrganization) {
    await Region0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Region1 = await Regions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Region1?.setOrganization) {
    await Region1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Region2 = await Regions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Region2?.setOrganization) {
    await Region2.setOrganization(relatedOrganization2);
  }
}

async function associateRestorationProjectWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RestorationProject0 = await RestorationProjects.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (RestorationProject0?.setOrganization) {
    await RestorationProject0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RestorationProject1 = await RestorationProjects.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (RestorationProject1?.setOrganization) {
    await RestorationProject1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RestorationProject2 = await RestorationProjects.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (RestorationProject2?.setOrganization) {
    await RestorationProject2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Alerts.bulkCreate(AlertsData);

    await CorporateSponsors.bulkCreate(CorporateSponsorsData);

    await EducationalContents.bulkCreate(EducationalContentsData);

    await Regions.bulkCreate(RegionsData);

    await RestorationProjects.bulkCreate(RestorationProjectsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateAlertWithRegion(),

      await associateAlertWithOrganization(),

      // Similar logic for "relation_many"

      await associateCorporateSponsorWithOrganization(),

      await associateEducationalContentWithOrganization(),

      await associateRegionWithOrganization(),

      await associateRestorationProjectWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alerts', null, {});

    await queryInterface.bulkDelete('corporate_sponsors', null, {});

    await queryInterface.bulkDelete('educational_contents', null, {});

    await queryInterface.bulkDelete('regions', null, {});

    await queryInterface.bulkDelete('restoration_projects', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
