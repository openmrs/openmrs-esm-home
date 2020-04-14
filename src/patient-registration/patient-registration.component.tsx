import React, { useEffect, useState, useRef } from "react";
import styles from "./patient-registration.css";
import { Patient } from "./patient-registration-helper";
import {
  getCurrentUserLocation,
  getUniquePatientIdentifier,
  savePatient
} from "./patient-registration.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";

const IDENTIFIER_TYPE: string = "05a29f94-c0ed-11e2-94be-8c13b969e334";

export function PatientRegistration(props: PatientRegistrationProps) {
  const [givenName, setGiveName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [gender, setGender] = useState<string>("selectGender");
  const [birthDate, setBirthDate] = useState("");
  const [estimatedBirthDate, setEstimatedBirthDate] = useState<Boolean>();
  const [address, setAddress] = useState<string>("");
  const [addressTwo, setAddressTwo] = useState<string>("");
  const [cityOrVillage, setCityOrVillage] = useState<string>("");
  const [stateOrProvince, setStateOrProvince] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const [location, setLocation] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");

  useEffect(() => {
    const abortController = new AbortController();
    getCurrentUserLocation(abortController).then(
      ({ data }) => setLocation(data.sessionLocation.uuid),
      createErrorHandler()
    );
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getUniquePatientIdentifier(abortController).then(({ data }) => {
      setIdentifier(data.identifiers[0]), createErrorHandler();
    });
    return () => abortController.abort();
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    let patient: Patient = {
      identifiers: [
        {
          identifier: identifier,
          identifierType: IDENTIFIER_TYPE,
          location: location,
          preferred: true
        }
      ],
      person: {
        gender: gender,
        birthdate: birthDate,
        age: 0,
        names: [
          {
            givenName: givenName,
            familyName: familyName,
            middleName: middleName
          }
        ],
        addresses: [
          {
            preferred: true,
            stateProvince: stateOrProvince,
            country: country,
            address1: address,
            address2: addressTwo,
            cityVillage: cityOrVillage
          }
        ]
      }
    };
    const abortController = new AbortController();
    savePatient(abortController, patient).then(
      response => response.status == 201 && navigate(response.data.uuid),
      createErrorHandler()
    );
  };

  const navigate = (patientUuid: string) => {
    window.location.href = `/openmrs/spa/patient/${patientUuid}/chart`;
  };

  return (
    <form
      autoComplete="off"
      className={`${styles.PatientRegistrationWrapper}`}
      ref={formRef}
      onSubmit={$event => handleFormSubmit($event)}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Patient Registration</h2>
        </div>
      </div>
      <div className={styles.patientContainer}>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="givenName">Given Name</label>
          <input
            type="text"
            name="givenName"
            id="givenName"
            autoComplete="off"
            value={givenName}
            onChange={$event => setGiveName($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            name="middleName"
            id="middleName"
            autoComplete="no"
            value={middleName}
            onChange={$event => setMiddleName($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="familyName">Family Name</label>
          <input
            type="text"
            name="familyName"
            id="familyName"
            autoComplete="no"
            value={familyName}
            onChange={$event => setFamilyName($event.target.value)}
          />
        </div>
      </div>
      <div className={styles.patientContainer}>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={$event => setGender($event.target.value)}
          >
            <option value="selectGender">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>
      <div className={styles.patientContainer}>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="birthDate">Birth Date</label>
          <div className="omrs-datepicker">
            <input
              type="date"
              name="datepicker"
              required
              value={birthDate}
              onChange={$event => setBirthDate($event.target.value)}
            />
            <svg className="omrs-icon" role="img">
              <use xlinkHref="#omrs-icon-calendar"></use>
            </svg>
          </div>
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="estimatedBirthDate">Estimated Birth Date</label>
          <div className="toggleSwitch" style={{ width: "50%" }}>
            <input type="radio" name="toggleButton" id="toggleButton1" />
            <label htmlFor="toggleButton1">Yes</label>
            <input type="radio" name="toggleButton" id="toggleButton2" />
            <label htmlFor="toggleButton2">No</label>
          </div>
        </div>
      </div>

      <div className={styles.patientContainer}>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={$event => setAddress($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="address2">Address (2)</label>
          <input
            type="text"
            name="address2"
            id="address2"
            value={addressTwo}
            onChange={$event => setAddressTwo($event.target.value)}
          />
        </div>
      </div>

      <div className={styles.patientContainer}>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="cityorvillage">City/Village</label>
          <input
            type="text"
            name="cityorvillage"
            id="cityorvillage"
            value={cityOrVillage}
            onChange={$event => setCityOrVillage($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="stateorprovince">State/Province</label>
          <input
            type="text"
            name="stateorprovince"
            id="stateorprovince"
            value={stateOrProvince}
            onChange={$event => setStateOrProvince($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={$event => setCountry($event.target.value)}
          />
        </div>
        <div className={styles.patientRegistrationInputContainer}>
          <label htmlFor="country">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            value={phoneNumber}
            onChange={$event => setPhoneNumber($event.target.value)}
          />
        </div>
      </div>

      <div className={styles.patientContainer}>
        <div className={`${styles.buttonContainer} ${styles.buttonTopHeader}`}>
          <button
            onClick={() => {
              formRef.current.reset();
            }}
            className={`omrs-link omrs-outlined-neutral`}
            type="button"
          >
            Cancel
          </button>
          <button className={`omrs-link omrs-filled-action`}>
            Sign & Save
          </button>
        </div>
      </div>
    </form>
  );
}

type PatientRegistrationProps = {};
