import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './createDashboardLink.component';
import { dashboardMeta } from './dashboard.meta';
import { esmHomeSchema } from './openmrs-esm-home-schema';
import rootComponent from './root.component';
import homeNavMenuComponent from './side-menu/side-menu.component';
import homeWidgetDashboardComponent from './home-page-widgets/home-page-widgets.component';

const moduleName = '@openmrs/esm-home-app';
const pageName = 'home';

const options = {
  featureName: pageName,
  moduleName,
};

export const importTranslation = require.context('../translations', true, /.json$/, 'lazy');

export const root = getSyncLifecycle(rootComponent, options);

export const homeNavMenu = getSyncLifecycle(homeNavMenuComponent, options);

export const homeWidgetDbLink = getSyncLifecycle(createDashboardLink(dashboardMeta), options);

export const homeWidgetDashboard = getSyncLifecycle(homeWidgetDashboardComponent, options);

export const metricsSlot = getAsyncLifecycle(() => import('./metrics/metrics.component'), options);

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
