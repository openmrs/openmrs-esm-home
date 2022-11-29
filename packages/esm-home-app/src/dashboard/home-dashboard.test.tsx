import React from 'react';
import { queryByAttribute, screen } from '@testing-library/react';
import { useConfig, UserHasAccess } from '@openmrs/esm-framework';
import HomeDashboard from './home-dashboard.component';
import renderWithRouter from '../helpers/render-with-router';

const mockedUseConfig = useConfig as jest.Mock;
const mockedUserHasAccess = UserHasAccess as jest.Mock;

function renderHomeDashboard() {
  return renderWithRouter(<HomeDashboard />);
}
describe('Home Dashboard', () => {
  it('renders buttons declared in config', () => {
    mockedUseConfig.mockReturnValue({
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

    renderHomeDashboard();

    expect(screen.getByRole('link', { name: /Foo/i })).toBeInTheDocument();
  });

  it('renders selectively based on privileges', () => {
    mockedUserHasAccess.mockImplementation((props) => {
      if (['View Patients', 'Can Foo'].includes(props.privilege)) {
        return props.children;
      } else {
        return null;
      }
    });

    mockedUseConfig.mockReturnValueOnce({
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

    renderHomeDashboard();

    expect(screen.getByRole('link', { name: /Foo/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Bar/i })).not.toBeInTheDocument();
  });

  it('should hide OpenMRS logo,when config is set to `false`', () => {
    mockedUseConfig.mockReturnValueOnce({ showOpenMRSLogo: false, buttons: { list: [] } });
    const { container } = renderHomeDashboard();
    expect(container.querySelectorAll('section')[0]).not.toHaveClass('logoSection');
  });

  it('should display OpenMRS logo,by default', () => {
    mockedUseConfig.mockReturnValueOnce({ showOpenMRSLogo: true, buttons: { list: [] } });
    const { container } = renderHomeDashboard();
    expect(container.querySelectorAll('section')[1]).toHaveClass('logoSection');
  });
});
