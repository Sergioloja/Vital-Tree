import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/alerts/alerts-list',
    label: 'Alerts',
    icon: mdiTable,
    permissions: 'READ_ALERTS',
  },
  {
    href: '/corporate_sponsors/corporate_sponsors-list',
    label: 'Corporate sponsors',
    icon: mdiTable,
    permissions: 'READ_CORPORATE_SPONSORS',
  },
  {
    href: '/educational_contents/educational_contents-list',
    label: 'Educational contents',
    icon: mdiTable,
    permissions: 'READ_EDUCATIONAL_CONTENTS',
  },
  {
    href: '/regions/regions-list',
    label: 'Regions',
    icon: mdiTable,
    permissions: 'READ_REGIONS',
  },
  {
    href: '/restoration_projects/restoration_projects-list',
    label: 'Restoration projects',
    icon: mdiTable,
    permissions: 'READ_RESTORATION_PROJECTS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    icon: mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    icon: mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    icon: mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/api-docs',
    label: 'Swagger API',
    icon: mdiAccountCircle,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
