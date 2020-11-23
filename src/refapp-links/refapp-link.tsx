import React from "react";
import { ConfigurableLink } from "@openmrs/esm-config";
import { UserHasAccessReact } from "@openmrs/esm-api";

interface RefAppLinkProps {
  label: string;
  to: string;
  privilege?: string;
}

export function RefAppLink(props: RefAppLinkProps) {
  return (
    <UserHasAccessReact privilege={props.privilege}>
      <ConfigurableLink
        className={`omrs-link omrs-filled-neutral`}
        to={props.to}
      >
        {props.label}
      </ConfigurableLink>
    </UserHasAccessReact>
  );
}
