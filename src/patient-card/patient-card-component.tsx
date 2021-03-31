import * as React from "react";
import { Button } from "carbon-components-react";
import styles from "./patient-card.scss";
import { ConfigurableLink, ExtensionSlot } from "@openmrs/esm-framework";
import CaretDown16 from "@carbon/icons-react/es/caret--down/16";
import CaretUp16 from "@carbon/icons-react/es/caret--up/16";
import ContactDetails from "../contact-details/contact-details.component";

export interface PatientCardProps {
  patientUuid: string;
  displayName: string;
  gender: string;
  birthDate: string;
  identifier: string;
  age: string;
  address: fhir.Address[];
  telecom: fhir.ContactPoint[];
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
}): JSX.Element => {
  const [showContactDetails, setShowContactDetails] = React.useState(false);
  const toggleContactDetails = () => {
    setShowContactDetails(!showContactDetails);
  };

  const patientAvatar = (
    <div className={styles.patientAvatar}>
      <ExtensionSlot
        extensionSlotName="patient-photo"
        state={{ patientUuid: patientUuid }}
      />
    </div>
  );

  const patientInfo = (
    <div className={styles.patientInfo}>
      <div>
        <span className={styles.patientName}>{displayName}</span>
      </div>
      <div className={styles.demographics}>
        <span>{gender === "M" ? "Male" : "Female"}</span> &middot;{" "}
        <span>
          {age} {age === "1" ? "year" : "years"}
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
            iconDescription="Toggle contact details"
            onClick={toggleContactDetails}
          >
            {showContactDetails
              ? "Hide Contact Details"
              : "Show Contact Details"}
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
