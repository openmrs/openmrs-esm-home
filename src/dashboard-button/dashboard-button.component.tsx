import React from "react";
import { ConfigurableLink, UserHasAccess } from "@openmrs/esm-framework";
import styles from "./dashboard-button.component.css";

export interface DashboardButtonProps {
  label: string;
  link: string;
  requiredPrivilege: string | void;
}

export default function DashboardButton(props: DashboardButtonProps) {
  const className = `omrs-link omrs-filled-neutral ${styles.link}`;
  const label = <div className={styles.textContainer}>{props.label}</div>;
  const button = (
    <ConfigurableLink className={className} to={props.link}>
      {label}
    </ConfigurableLink>
  );

  return props.requiredPrivilege ? (
    <UserHasAccess privilege={props.requiredPrivilege}>{button}</UserHasAccess>
  ) : (
    button
  );
}
