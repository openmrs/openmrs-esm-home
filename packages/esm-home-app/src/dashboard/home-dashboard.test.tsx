import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { useConfig as mockUseConfig, UserHasAccess as mockUserHasAccessReact } from '@openmrs/esm-framework';
import HomeDashboard from './home-dashboard.component';
import renderWithRouter from '../helpers/render-with-router';

const match = { params: { id: 1 }, isExact: true, path: '', url: '' };

function renderHome() {
  return renderWithRouter(<HomeDashboard match={match} canSearch />);
}

it('renders without failing', () => {
  renderHome();
});

it('renders buttons declared in config', () => {
  (mockUseConfig as jest.MockedFunction<any>).mockReturnValue({
    buttons: {
      enabled: true,
      list: [
        {
          label: 'Foo',
          link: '/some/route',
        },
      ],
    },
  });
  const { getByText } = renderHome();
  const fooButton = getByText('Foo');
  expect(fooButton).not.toBeNull();
});

it('renders selectively based on privileges', () => {
  (mockUserHasAccessReact as any).mockImplementation((props) => {
    if (['View Patients', 'Can Foo'].includes(props.privilege)) {
      return props.children;
    } else {
      return null;
    }
  });
  (mockUseConfig as jest.MockedFunction<any>).mockReturnValue({
    buttons: {
      enabled: true,
      list: [
        {
          label: 'Foo',
          link: 'foo',
          requiredPrivilege: 'Can Foo',
        },
        {
          label: 'Bar',
          link: 'bar',
          requiredPrivilege: 'Can Bar',
        },
      ],
    },
  });
  const { queryByText } = renderHome();
  expect(queryByText('Foo')).not.toBeNull();
  expect(queryByText('Bar')).toBe(null);
});
