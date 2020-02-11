import React from "react";
import styles from "./dashboard-button.component.css";

export default function DashboardButton(props: DashboardButtonProps) {
  return (
    <a
      className={`omrs-link omrs-filled-neutral ${styles.link}`}
      onClick={event => navigate(event, props, props.link)}
      href={props.link.url}
    >
      <div className={styles.textContainer}>{props.label}</div>
    </a>
  );
}

function navigate(event, props, urlConfig: UrlConfig) {
  if (!event.ctrlKey && event.which != 2 && event.which != 3) {
    if (urlConfig.spa) {
      props.history.push(urlConfig.url);
    } else {
      window.location.href = urlConfig.url;
    }
  }
}

type DashboardButtonProps = {
  label: string;
  link: UrlConfig;
};

type UrlConfig = {
  spa: boolean;
  url: string;
};
