import React from "react";

export const ExtensionSlotReact = jest.fn().mockImplementation((props: any) => {
  return props.children;
});

export const ExtensionReact = jest.fn().mockImplementation((props: any) => {
  return <slot />;
});
