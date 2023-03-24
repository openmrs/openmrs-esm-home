import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './createDashboardLink';
import { homeWidgetDashboardMeta } from './dashboard.meta';
import { esmHomeSchema } from './openmrs-esm-home-schema';

declare var __VERSION__: string;
// __VERSION__ is replaced by Webpack with the version from package.json
const version = __VERSION__;

const backendDependencies = {
  'webservices.rest': '^2.24.0',
};

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-home-app';
  const pageName = 'home';

  const options = {
    featureName: pageName,
    moduleName,
  };

  defineConfigSchema(moduleName, esmHomeSchema);

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/${pageName}`,
      title: 'Home',
    },
  ]);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root.component'), options),
        route: pageName,
        online: {
          canSearch: true,
        },
        offline: {
          canSearch: false,
        },
      },
    ],
    extensions: [
      {
        id: 'active-visits-link',
        load: getAsyncLifecycle(() => import('./refapp-links/active-visits'), options),
        privilege: 'App: coreapps.activeVisits',
        online: true,
        offline: true,
      },
      {
        id: 'capture-vitals-link',
        load: getAsyncLifecycle(() => import('./refapp-links/capture-vitals'), options),
        privilege: 'App: referenceapplication.vitals',
        online: true,
        offline: false,
      },
      {
        id: 'appointment-scheduling-link',
        load: getAsyncLifecycle(() => import('./refapp-links/appointment-scheduling'), options),
        privilege: 'App: appointmentschedulingui.home',
        online: true,
        offline: false,
      },
      {
        id: 'reports-link',
        load: getAsyncLifecycle(() => import('./refapp-links/reports'), options),
        privilege: 'View Reports',
        online: true,
        offline: false,
      },
      {
        id: 'data-management-link',
        load: getAsyncLifecycle(() => import('./refapp-links/data-management'), options),
        privilege: 'App: coreapps.dataManagement',
        online: true,
        offline: false,
      },
      {
        id: 'configure-metadata-link',
        load: getAsyncLifecycle(() => import('./refapp-links/configure-metadata'), options),
        privilege: 'App: coreapps.configuremetadata',
        online: true,
        offline: false,
      },
      {
        id: 'system-administration-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/system-administration'), options),
        privilege: 'App: coreapps.systemAdministration',
        online: true,
        offline: false,
      },
      {
        id: 'home-sidebar-slot-ext',
        slot: 'home-sidebar-slot',
        load: getAsyncLifecycle(() => import('./side-menu/side-menu.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'home-widget-db-link',
        slot: 'homepage-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(homeWidgetDashboardMeta), options),
        meta: homeWidgetDashboardMeta,
        online: true,
        offline: true,
        order: 0,
      },
      {
        id: 'home-widget-dashboard',
        slot: 'home-dashboard-slot',
        load: getAsyncLifecycle(() => import('./home-page-widgets/home-page-widgets.component'), options),
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
