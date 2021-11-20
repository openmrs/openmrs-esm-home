import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { esmHomeSchema } from './openmrs-esm-home-schema';

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
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/active-visits'), options),
        privilege: 'App: coreapps.activeVisits',
        online: true,
        offline: true,
      },
      {
        id: 'capture-vitals-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/capture-vitals'), options),
        privilege: 'App: referenceapplication.vitals',
        online: true,
        offline: false,
      },
      {
        id: 'appointment-scheduling-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/appointment-scheduling'), options),
        privilege: 'App: appointmentschedulingui.home',
        online: true,
        offline: false,
      },
      {
        id: 'reports-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/reports'), options),
        privilege: 'View Reports',
        online: true,
        offline: false,
      },
      {
        id: 'data-management-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/data-management'), options),
        privilege: 'App: coreapps.dataManagement',
        online: true,
        offline: false,
      },
      {
        id: 'configure-metadata-link',
        slot: 'app-menu-slot',
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
        id: 'external-app-menu-links',
        slot: 'app-menu-external-links-slot',
        load: getAsyncLifecycle(() => import('./refapp-links/external-ref-links.component'), options),
        // privelege: '',
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
