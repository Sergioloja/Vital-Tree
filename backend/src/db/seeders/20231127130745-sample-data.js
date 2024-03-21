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
    alert_time: new Date('2023-10-28'),

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-09-27'),

    description: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2024-03-13'),

    description: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2024-02-02'),

    description: 'Not if anything to say about it I have',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    alert_time: new Date('2023-05-03'),

    description:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CorporateSponsorsData = [
  {
    company_name: 'Like a red-headed stepchild',

    industry: 'Come on now',

    csr_focus: "How 'bout them Cowboys",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'I want my damn cart back',

    industry: "I'm washing my hands of it",

    csr_focus: 'Might be DQ time',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'I want my damn cart back',

    industry: 'Standby',

    csr_focus: 'I tell you what',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: 'Come on now',

    industry: "How 'bout them Cowboys",

    csr_focus: "It's around here somewhere",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    company_name: "Goin' hog huntin'",

    industry: 'That damn gimble',

    csr_focus: "How 'bout them Cowboys",

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const EducationalContentsData = [
  {
    title: 'Standby',

    content:
      'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Reminds me of my old girlfriend Olga Goodntight',

    content:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'My buddy Harlen',

    content: 'Strong is Vader. Mind what you have learned. Save you it can.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Contact the tower',

    content: 'You will find only what you bring in.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Turd gone wrong',

    content: 'At an end your rule is, and not short enough it was!',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const RegionsData = [
  {
    name: 'Francis Galton',

    coordinates: 'Reminds me of my old girlfriend Olga Goodntight',

    // type code here for "relation_one" field
  },

  {
    name: 'William Herschel',

    coordinates: 'Let me tell ya',

    // type code here for "relation_one" field
  },

  {
    name: 'Emil Kraepelin',

    coordinates: 'I got that scurvy',

    // type code here for "relation_one" field
  },

  {
    name: 'Gertrude Belle Elion',

    coordinates: 'My boss gonna fire me',

    // type code here for "relation_one" field
  },

  {
    name: 'Frederick Sanger',

    coordinates: "I'm washing my hands of it",

    // type code here for "relation_one" field
  },
];

const RestorationProjectsData = [
  {
    project_name: 'That damn Bill Stull',

    funding_goal: 26.13,

    current_funding: 99.25,

    start_date: new Date('2023-11-04'),

    end_date: new Date('2024-01-14'),

    description: 'Reckless he is. Matters are worse.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'That goddamn Datamate',

    funding_goal: 84.66,

    current_funding: 37.95,

    start_date: new Date('2023-11-24'),

    end_date: new Date('2023-12-31'),

    description: 'Mudhole? Slimy? My home this is!',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: "Goin' hog huntin'",

    funding_goal: 97.94,

    current_funding: 98.32,

    start_date: new Date('2023-06-21'),

    end_date: new Date('2023-08-01'),

    description: 'Your weapons, you will not need them.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: 'Might be DQ time',

    funding_goal: 45.22,

    current_funding: 95.81,

    start_date: new Date('2023-05-01'),

    end_date: new Date('2024-03-02'),

    description: 'Good relations with the Wookiees, I have.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    project_name: "How 'bout them Cowboys",

    funding_goal: 71.96,

    current_funding: 60.77,

    start_date: new Date('2023-08-07'),

    end_date: new Date('2023-03-25'),

    description:
      'Yes, a Jedi’s strength flows from the Force. But beware of the dark side. Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny, consume you it will, as it did Obi-Wan’s apprentice.',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Anton van Leeuwenhoek',
  },

  {
    name: 'William Herschel',
  },

  {
    name: 'Edwin Hubble',
  },

  {
    name: 'Edwin Hubble',
  },

  {
    name: 'William Bayliss',
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setOrganization) {
    await User4.setOrganization(relatedOrganization4);
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

  const relatedRegion4 = await Regions.findOne({
    offset: Math.floor(Math.random() * (await Regions.count())),
  });
  const Alert4 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Alert4?.setRegion) {
    await Alert4.setRegion(relatedRegion4);
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Alert4 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Alert4?.setOrganization) {
    await Alert4.setOrganization(relatedOrganization4);
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const CorporateSponsor4 = await CorporateSponsors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CorporateSponsor4?.setOrganization) {
    await CorporateSponsor4.setOrganization(relatedOrganization4);
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const EducationalContent4 = await EducationalContents.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (EducationalContent4?.setOrganization) {
    await EducationalContent4.setOrganization(relatedOrganization4);
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Region4 = await Regions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Region4?.setOrganization) {
    await Region4.setOrganization(relatedOrganization4);
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

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const RestorationProject4 = await RestorationProjects.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (RestorationProject4?.setOrganization) {
    await RestorationProject4.setOrganization(relatedOrganization4);
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
