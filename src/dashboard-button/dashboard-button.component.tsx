import React from "react";
import { UserHasAccessReact } from "@openmrs/esm-api";
import { ConfigurableLink } from "@openmrs/esm-config";
import styles from "./dashboard-button.component.css";

export default function DashboardButton(props: DashboardButtonProps) {
  const className = `omrs-link omrs-filled-neutral ${styles.link}`;
  const label = <div className={styles.textContainer}>{props.label}</div>;
  const button = (
    <ConfigurableLink className={className} to={props.link}>
      {label}
    </ConfigurableLink>
  );
  return props.requiredPrivilege ? (
    <UserHasAccessReact privilege={props.requiredPrivilege}>
      {button}
    </UserHasAccessReact>
  ) : (
    button
  );
}

interface DashboardButtonProps {
  label: string;
  link: string;
  requiredPrivilege: string | void;
}
