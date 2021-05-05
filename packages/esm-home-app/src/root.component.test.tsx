import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Root from './root.component';

afterAll(cleanup);

window.spaBase = '/';

describe(`<Root />`, () => {
  afterEach(cleanup);
  it(`renders without dying`, () => {
    const wrapper = render(<Root canSearch />);
  });
});
