import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(
  ui,
  { route = '/', match = { params: {}, isExact: true, path: '', url: '' } } = {},
) {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<MemoryRouter>{ui}</MemoryRouter>),
    history,
    match,
  };
}
