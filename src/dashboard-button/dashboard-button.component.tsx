import React from "react";
import styles from "./dashboard-button.component.css";
import { Link } from "react-router-dom";
import { UserHasAccessReact } from "@openmrs/esm-api";

function nonSpaNavigate(event: MouseEvent, url: string) {
  if (!event.ctrlKey && event.which != 2 && event.which != 3) {
    window.location.href = url;
  }
}

export interface DashboardButtonProps {
  label: string;
  link: string;
  requiredPrivilege: string | void;
  spa?: boolean;
}

export default function DashboardButton(props: DashboardButtonProps) {
  const className = `omrs-link omrs-filled-neutral ${styles.link}`;
  const label = <div className={styles.textContainer}>{props.label}</div>;

  const button = props.spa ? (
    <Link to={props.link} className={className}>
      {label}
    </Link>
  ) : (
    <a
      className={className}
      onClick={event => nonSpaNavigate(event.nativeEvent, props.link)}
      href={props.link}
    >
      {label}
    </a>
  );

  return props.requiredPrivilege ? (
    <UserHasAccessReact privilege={props.requiredPrivilege}>
      {button}
    </UserHasAccessReact>
  ) : (
    button
  );
}
