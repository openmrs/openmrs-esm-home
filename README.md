:wave:	*New to our project? Be sure to review the [OpenMRS 3 Frontend Developer Documentation](https://o3-docs.openmrs.org/docs/introduction).

![Node.js CI](https://github.com/openmrs/openmrs-esm-home/actions/workflows/node.js.yml/badge.svg)

# OpenMRS ESM Home

An [OpenMRS Microfrontend](https://openmrs.atlassian.net/wiki/spaces/projects/pages/26936899/OpenMRS+3.0+A+Frontend+Framework+that+enables+collaboration+and+better+User+Experience) for frontend modules tied to the home page.

## What is this?

openmrs-esm-home is an in-browser 
[javascript module](https://github.com/openmrs/openmrs-rfc-frontend/blob/master/text/0002-modules.md) 
that is a [single-spa application](https://single-spa.js.org/docs/building-applications.html).
It is responsible for rendering the UI for the landing page after the user logs in.

## Contributing / Development

Check out the developer documentation [here](https://o3-docs.openmrs.org/docs/frontend-modules/development).

This monorepo uses [yarn](https://yarnpkg.com/).

To install the dependencies, run:

```bash
yarn
```
To start a dev server for a specific microfrontend, run:

```bash
yarn start --sources 'packages/esm-patient-<insert-package-name>-app'
```
For example, to run the home microfrontend, you'd use:

```bash
yarn start --sources 'packages/esm-home-app' 
```

## Running tests

To run tests for all packages, run:

```bash
yarn turbo run test
```

To run tests in `watch` mode, run:

```bash
yarn turbo run test:watch
```
To run tests for a specific package, pass the package name to the `--filter` flag. For example, to run tests for `esm-home-app`, run:

```bash
yarn turbo run test --filter=@openmrs/esm-home-app
```

To run a specific test file, run:

```bash
yarn turbo run test -- <insert-test-file>
```

The above command will only run tests in the file or files that match the provided string.

You can also run the matching tests from above in watch mode by running:

```bash
yarn turbo run test:watch -- <insert-test-file>
```

To generate a `coverage` report, run:

```bash
yarn turbo run coverage
```

By default, `turbo` will cache test runs. This means that re-running tests wihout changing any of the related files will return the cached logs from the last run. To bypass the cache, run tests with the `force` flag, as follows:

```bash
yarn turbo run test --force
```
## Troubleshooting

If you notice that your local version of the application is not working or that there's a mismatch between what you see locally versus what's in [dev3](https://dev3.openmrs.org/openmrs/spa), you likely have outdated versions of core libraries. To update core libraries, run the following commands:

```bash
# Upgrade core libraries
yarn up openmrs@next @openmrs/esm-framework@next

# Reset version specifiers to `next`. Don't commit actual version numbers.
git checkout package.json

# Run `yarn` to recreate the lockfile
yarn
```

## Design Patterns

For documentation about our design patterns, please visit our [design system](https://om.rs/o3ui) documentation website.

## Configuration

Please see the [Implementer Documentation](https://wiki.openmrs.org/pages/viewpage.action?pageId=224527013) for information about configuring modules.

## Deployment

See [Creating a Distribution](http://o3-dev.docs.openmrs.org/#/main/distribution?id=creating-a-distribution) for information about adding microfrontends to a distribution.

