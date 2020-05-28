import React from "react";
import styles from "./dashboard-button.component.css";
import { Link } from "react-router-dom";
import { UserHasAccessReact } from "@openmrs/esm-api";

export default function DashboardButton(props: DashboardButtonProps) {
  const className = `omrs-link omrs-filled-neutral ${styles.link}`;
  const label = <div className={styles.textContainer}>{props.label}</div>;
  const button = props.link.spa ? (
    <Link to={props.link.url} className={className}>
      {label}
    </Link>
  ) : (
    <a
      className={className}
      onClick={event => nonSpaNavigate(event, props.link.url)}
      href={props.link.url}
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

function nonSpaNavigate(event, url: string) {
  if (!event.ctrlKey && event.which != 2 && event.which != 3) {
    window.location.href = url;
  }
}

interface DashboardButtonProps {
  label: string;
  link: UrlConfig;
  requiredPrivilege: string | void;
}

type UrlConfig = {
  spa: boolean;
  url: string;
};
