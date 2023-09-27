import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './createDashboardLink.component';
import { dashboardMeta } from './dashboard.meta';
import { esmHomeSchema } from './openmrs-esm-home-schema';

const moduleName = '@openmrs/esm-home-app';
const pageName = 'home';

const options = {
  featureName: pageName,
  moduleName,
};

export const importTranslation = require.context('../translations', true, /.json$/, 'lazy');

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const homeNavMenu = getAsyncLifecycle(() => import('./side-menu/side-menu.component'), options);

export const homeWidgetDbLink = getSyncLifecycle(createDashboardLink(dashboardMeta), options);

export const homeWidgetDashboard = getAsyncLifecycle(
  () => import('./home-page-widgets/home-page-widgets.component'),
  options,
);

export function startupApp() {
  defineConfigSchema(moduleName, esmHomeSchema);
  // t('Home', 'Home');

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/${pageName}`,
      title: () => Promise.resolve(window.i18next.t('Home', { defaultValue: 'Home', ns: moduleName })),
    },
  ]);
}
