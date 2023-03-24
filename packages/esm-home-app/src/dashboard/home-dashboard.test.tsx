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
