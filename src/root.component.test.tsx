import React from "react";
import { render, cleanup } from "@testing-library/react";
import Root from "./root.component";

afterAll(cleanup);

window["getOpenmrsSpaBase"] = jest.fn().mockImplementation(() => "/");

describe(`<Root />`, () => {
  it(`renders without dying`, () => {
    const wrapper = render(<Root />);
  });
});
