import "./set-public-path";
import { registerApplication } from "single-spa";
import { routePrefix } from '@openmrs/esm-root-config';

registerApplication(
  "@openmrs/esm-home",
  () => import('./openmrs-esm-home'),
  location => routePrefix("home", location),
);

export { backendDependencies } from "./openmrs-backend-dependencies";
