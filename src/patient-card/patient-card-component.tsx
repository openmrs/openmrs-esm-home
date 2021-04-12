import * as React from "react";
import { Button } from "carbon-components-react";
import styles from "./patient-card.scss";
import { ConfigurableLink, ExtensionSlot } from "@openmrs/esm-framework";
import CaretDown16 from "@carbon/icons-react/es/caret--down/16";
import CaretUp16 from "@carbon/icons-react/es/caret--up/16";
import ContactDetails from "../contact-details/contact-details.component";
import { useTranslation } from "react-i18next";

export interface PatientCardProps {
  patientUuid: string;
  displayName: string;
  gender: string;
  birthDate: string;
  identifier: string;
  age: string;
  address: Array<fhir.Address>;
  telecom: Array<fhir.ContactPoint>;
  patientUrl?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patientUuid,
  displayName,
  gender,
  birthDate,
  identifier,
  age,
  address,
  telecom,
  patientUrl
}) => {
  const [showContactDetails, setShowContactDetails] = React.useState(false);
  const toggleContactDetails = () => {
    setShowContactDetails(!showContactDetails);
  };
  const avatarState = React.useMemo(() => {
    return { patientUuid: patientUuid };
  }, [patientUuid]);
  const { t } = useTranslation();

  const patientAvatar = (
    <div className={styles.patientAvatar}>
      <ExtensionSlot extensionSlotName="patient-photo" state={avatarState} />
    </div>
  );

  const patientInfo = (
    <div className={styles.patientInfo}>
      <div>
        <span className={styles.patientName}>{displayName}</span>
      </div>
      <div className={styles.demographics}>
        <span>
          {gender === "M" ? t("male", "Male") : t("female", "Female")}
        </span>{" "}
        &middot;{" "}
        <span>
          {age} {age === "1" ? t("year", "year") : t("years", "years")}
        </span>{" "}
        &middot; <span>{birthDate}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.identifiers}>{identifier}</span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.patientBanner}>
        {patientUrl ? (
          <ConfigurableLink
            key={displayName}
            className={styles.patientCharts}
            to={patientUrl}
          >
            {patientAvatar}
            {patientInfo}
          </ConfigurableLink>
        ) : (
          <div className={styles.patientCharts}>
            {patientAvatar}
            {patientInfo}
          </div>
        )}

        <div className={styles.showDetails}>
          <Button
            kind="ghost"
            renderIcon={showContactDetails ? CaretUp16 : CaretDown16}
            iconDescription={t(
              "toggleContactDetails",
              "Toggle contact details"
            )}
            onClick={toggleContactDetails}
          >
            {showContactDetails
              ? t("hideContactDetails", "Hide Contact Details")
              : t("showContactDetails", "Show Contact Details")}
          </Button>
        </div>
      </div>
      {showContactDetails && (
        <ContactDetails
          address={address}
          telecom={telecom}
          patientId={patientUuid}
        />
      )}
    </div>
  );
};

export default PatientCard;
