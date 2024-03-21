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
    alert_time: new Date('2023-10-27'),

    description: 'Good relations with the Wookiees, I have.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2024-02-25'),

    description: 'Hmm. In the end, cowards are those who follow the dark side.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-09-06'),

    description:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-11-19'),

    description:
      'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained. A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away - to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CorporateSponsorsData = [
  {
    company_name: 'Reminds me of my old girlfriend Olga Goodntight',

    industry: 'That damn diabetes',

    csr_focus: "How 'bout them Cowboys",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'Let me tell ya',

    industry: 'That damn gimble',

    csr_focus: "How 'bout them Cowboys",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: "I'm washing my hands of it",

    industry: 'Come on now',

    csr_focus: "C'mon Naomi",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'Reminds me of my old girlfriend Olga Goodntight',

    industry: "C'mon Naomi",

    csr_focus: 'Let me tell ya',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const EducationalContentsData = [
  {
    title: 'Texas!',

    content: 'Do. Or do not. There is no try.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'That goddamn Datamate',

    content: 'Feel the force!',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: "That's messed up",

    content: 'Your weapons, you will not need them.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: "Goin' hog huntin'",

    content:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const RegionsData = [
  {
    name: 'Theodosius Dobzhansky',

    coordinates: 'Yup',

    // type code here for "relation_one" field
  },

  {
    name: 'August Kekule',

    coordinates: 'Reminds me of my old girlfriend Olga Goodntight',

    // type code here for "relation_one" field
  },

  {
    name: 'Konrad Lorenz',

    coordinates: 'So I was walking Oscar',

    // type code here for "relation_one" field
  },

  {
    name: 'Neils Bohr',

    coordinates: 'My buddy Harlen',

    // type code here for "relation_one" field
  },
];

const RestorationProjectsData = [
  {
    project_name: 'My buddy Harlen',

    funding_goal: 29.52,

    current_funding: 42.67,

    start_date: new Date('2023-04-25'),

    end_date: new Date('2023-05-19'),

    description: 'Already know you that which you need.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'I want my 5$ back',

    funding_goal: 70.25,

    current_funding: 85.49,

    start_date: new Date('2023-12-01'),

    end_date: new Date('2024-01-08'),

    description: 'You will find only what you bring in.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'That damn diabetes',

    funding_goal: 43.42,

    current_funding: 85.58,

    start_date: new Date('2023-07-01'),

    end_date: new Date('2023-05-29'),

    description:
      'Soon will I rest, yes, forever sleep. Earned it I have. Twilight is upon me, soon night must fall.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: "Y'all never listen to me",

    funding_goal: 86.59,

    current_funding: 56.45,

    start_date: new Date('2023-10-28'),

    end_date: new Date('2023-11-07'),

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Marcello Malpighi',
  },

  {
    name: 'Christiaan Huygens',
  },

  {
    name: 'Franz Boas',
  },

  {
    name: 'August Kekule',
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
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

  const relatedRegion3 = await Regions.findOne({
    offset: Math.floor(Math.random() * (await Regions.count())),
  });
  const Alert3 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Alert3?.setRegion) {
    await Alert3.setRegion(relatedRegion3);
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Alert3 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Alert3?.setOrganization) {
    await Alert3.setOrganization(relatedOrganization3);
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const CorporateSponsor3 = await CorporateSponsors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CorporateSponsor3?.setOrganization) {
    await CorporateSponsor3.setOrganization(relatedOrganization3);
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const EducationalContent3 = await EducationalContents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (EducationalContent3?.setOrganization) {
    await EducationalContent3.setOrganization(relatedOrganization3);
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Region3 = await Regions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Region3?.setOrganization) {
    await Region3.setOrganization(relatedOrganization3);
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

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RestorationProject3 = await RestorationProjects.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (RestorationProject3?.setOrganization) {
    await RestorationProject3.setOrganization(relatedOrganization3);
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
