import React from "react";
import { ConfigurableLink, UserHasAccess } from "@openmrs/esm-framework";

interface RefAppLinkProps {
  label: string;
  to: string;
  privilege?: string;
}

export function RefAppLink(props: RefAppLinkProps) {
  return (
    <UserHasAccess privilege={props.privilege}>
      <ConfigurableLink
        className={`omrs-link omrs-filled-neutral`}
        to={props.to}
      >
        {props.label}
      </ConfigurableLink>
    </UserHasAccess>
  );
}
