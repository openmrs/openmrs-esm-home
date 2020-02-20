import React from "react";
import styles from "./dashboard-button.component.css";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

export default function DashboardButton(props: DashboardButtonProps) {
  const className = `omrs-link omrs-filled-neutral ${styles.link}`;
  const label = <div className={styles.textContainer}>{props.label}</div>;
  return props.link.spa ? (
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
}

function nonSpaNavigate(event, url: string) {
  if (!event.ctrlKey && event.which != 2 && event.which != 3) {
    window.location.href = url;
  }
}

interface DashboardButtonProps extends RouteComponentProps {
  label: string;
  link: UrlConfig;
}

type UrlConfig = {
  spa: boolean;
  url: string;
};
