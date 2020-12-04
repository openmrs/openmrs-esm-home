import React from "react";

import { match } from "react-router-dom";
import { Link, Tile } from "carbon-components-react";
import debounce from "lodash-es/debounce";
import isEmpty from "lodash-es/isEmpty";

import { performPatientSearch } from "./patient-search.resource";
import PatientSearchResults from "../patient-search-result/patient-search-result.component";
import EmptyDataIllustration from "./empty-data-illustration.component";
import { SearchedPatient } from "../types";
import styles from "./patient-search.scss";

function PatientSearch(props: PatientSearchProps) {
  const customReprestation =
    "custom:(patientId,uuid,identifiers,display," +
    "patientIdentifier:(uuid,identifier)," +
    "person:(gender,age,birthdate,birthdateEstimated,personName,display)," +
    "attributes:(value,attributeType:(name)))";
  const searchTimeout = 300;
  const resultsPerPage = 5;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [emptyResult, setEmptyResult] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<
    Array<SearchedPatient>
  >([]);
  const [pagedResults, setPagedResults] = React.useState<
    Array<SearchedPatient>
  >([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(10);
  const searchInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const ac = new AbortController();
    if (searchTerm) {
      performPatientSearch(searchTerm, customReprestation).then(({ data }) => {
        const results: Array<SearchedPatient> = data.results.map((res, i) => ({
          ...res,
          index: i + 1
        }));

        const pagedResults = results.slice(0, resultsPerPage);
        setSearchResults(results);
        setPagedResults(pagedResults);
        setTotalPages(Math.ceil(results.length) / totalPages);

        if (isEmpty(data.results)) {
          setEmptyResult(true);
        } else {
          setEmptyResult(false);
        }
      });
    } else {
      setEmptyResult(false);
      setSearchResults([]);
      setPagedResults([]);
    }
    return () => ac.abort();
  }, [searchTerm]);

  const handleChange = debounce(searchTerm => {
    setSearchTerm(searchTerm);
  }, searchTimeout);

  const handleFocus = () => {
    searchInput.current.focus();
  };

  return (
    <React.Fragment>
      <div className={styles.patientSearchHeader}>
        <input
          ref={searchInput}
          className={`omrs-type-title-5 ${styles.patientSearchInput}`}
          placeholder="Search for patient"
          aria-label="Search for patient"
          onChange={$event => handleChange($event.target.value)}
          autoFocus
        />
      </div>
      <div className={styles.searchResults}>
        {!isEmpty(searchResults) && (
          <div>
            <p>
              <span className={styles.resultsText}>
                Found {searchResults.length} patient{" "}
                {searchResults.length === 1 ? "chart" : "charts"} containing
              </span>
            </p>
            <p className={styles.searchTerm}>"{searchTerm}"</p>
            <PatientSearchResults
              match={props.match}
              searchTerm={searchTerm}
              patients={pagedResults}
            />
          </div>
        )}
      </div>
      {isEmpty(searchResults) && !emptyResult && (
        <Tile light style={{ textAlign: "center" }}>
          <p className={styles.actionText}>
            <span>
              Search by <b>patient number</b>
            </span>
            <br />
            <span>OR the patient's name(s)</span>
          </p>
        </Tile>
      )}
      {emptyResult && (
        <div className={styles.searchResults}>
          <p>
            <span className={styles.resultsText}>Search results for:</span>
          </p>
          <p className={styles.searchTerm}>"{searchTerm}"</p>
          <Tile light style={{ textAlign: "center" }}>
            <EmptyDataIllustration />
            <p className={styles.emptyResultText}>
              Sorry, no patient charts have been found
            </p>
            <p className={styles.actionText}>
              <span>Try searching with the patient's unique ID number</span>
              <br />
              <span>OR the patient's name(s)</span>
            </p>
            <Link onClick={handleFocus}>Search Again</Link>
          </Tile>
        </div>
      )}
    </React.Fragment>
  );
}

export default PatientSearch;

type PatientSearchProps = {
  match?: match;
  history?: any;
};
