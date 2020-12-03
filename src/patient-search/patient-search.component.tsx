import React from "react";

import { Link, Tile } from "carbon-components-react";
import debounce from "lodash-es/debounce";
import isEmpty from "lodash-es/isEmpty";
import { match } from "react-router-dom";

import { performPatientSearch } from "./patient-search.resource";
import PatientSearchResults from "../patient-search-result/patient-search-result.component";
import EmptyDataIllustration from "./empty-data-illustration.component";
import { SearchedPatient } from "../types";
import styles from "./patient-search.scss";

function PatientSearch(props: PatientSearchProps) {
  const searchTimeout = 300;
  const resultsPerPage = 10;
  const customReprestation =
    "custom:(patientId,uuid,identifiers,display,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,display),attributes:(value,attributeType:(name)))";

  const [searchResults, setSearchResults] = React.useState<
    Array<SearchedPatient>
  >([]);
  const [emptyResult, setEmptyResult] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [pagedResults, setPagedResults] = React.useState<
    Array<SearchedPatient>
  >([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [showPreviousButton, setShowPreviousButton] = React.useState(false);
  const searchInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    currentPage * resultsPerPage > searchResults.length
      ? setShowNextButton(false)
      : setShowNextButton(true);
    currentPage !== 1
      ? setShowPreviousButton(true)
      : setShowPreviousButton(false);
  }, [pagedResults, currentPage, resultsPerPage, searchResults]);

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
        setTotalPages(Math.ceil(results.length / 10));
        if (isEmpty(data.results)) {
          setCurrentPage(1);
          setEmptyResult(true);
        } else {
          setEmptyResult(false);
        }
      });
    } else {
      setCurrentPage(1);
      setEmptyResult(false);
      setSearchResults([]);
      setPagedResults([]);
    }
    return () => ac.abort();
  }, [searchTerm]);

  const handleChange = debounce(searchTerm => {
    setSearchTerm(searchTerm);
  }, searchTimeout);

  const nextPage = () => {
    let upperBound = currentPage * resultsPerPage + resultsPerPage;
    const lowerBound = currentPage * resultsPerPage;
    if (upperBound > searchResults.length) {
      upperBound = searchResults.length;
    }
    const pageResults = searchResults.slice(lowerBound, upperBound);
    setPagedResults(pageResults);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    const lowerBound = currentPage * resultsPerPage - resultsPerPage * 2;
    const upperBound = currentPage * resultsPerPage - resultsPerPage;
    const pageResults = searchResults.slice(lowerBound, upperBound);
    setPagedResults(pageResults);
    setCurrentPage(currentPage - 1);
  };

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
            <div>
              <p>
                <span className={styles.resultsText}>
                  {searchResults.length} patient{" "}
                  {searchResults.length === 1 ? "chart" : "charts"} containing
                </span>
              </p>
              <p className={styles.searchTerm}>"{searchTerm}"</p>
            </div>
            <PatientSearchResults
              match={props.match}
              searchTerm={searchTerm}
              patients={pagedResults}
            />
          </div>
        )}
      </div>
      {isEmpty(searchResults) && !emptyResult && (
        <div className={styles.searchHelper}>
          <p className={`omrs-type-body-regular ${styles.helperText}`}>
            Search by <span className="omrs-bold">patient number</span>
          </p>
          <p className={`omrs-type-body-regular ${styles.helperText}`}>
            If unsuccessful, try patient name
          </p>
        </div>
      )}
      {emptyResult && (
        <div className={styles.searchResults}>
          <div>
            <p>
              <span className={styles.resultsText}>Search results for:</span>
            </p>
            <p className={styles.searchTerm}>"{searchTerm}"</p>
          </div>
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
      <div className={styles.pagination}>
        {showPreviousButton && (
          <button
            onClick={previousPage}
            className={`omrs-btn omrs-outlined-action omrs-rounded ${styles.prevBtn}`}
          >
            Previous
          </button>
        )}
        {showNextButton && (
          <button
            onClick={nextPage}
            className={`omrs-btn omrs-outlined-action omrs-rounded ${styles.nextBtn}`}
          >
            Next
          </button>
        )}
      </div>
    </React.Fragment>
  );
}

export default PatientSearch;

type PatientSearchProps = {
  match?: match;
  history?: any;
};
