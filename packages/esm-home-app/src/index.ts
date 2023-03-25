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
        id: 'home-nav-menu',
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
