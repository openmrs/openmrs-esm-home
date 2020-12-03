import React, { useState, useEffect } from "react";

import { match } from "react-router-dom";
import debounce from "lodash-es/debounce";
import isEmpty from "lodash-es/isEmpty";

import { performPatientSearch } from "./patient-search.resource";
import PatientSearchResults from "../patient-search-result/patient-search-result.component";
import styles from "./patient-search.scss";
import { SearchedPatient } from "../types";

export default function PatientSearch(props: PatientSearchProps) {
  const searchTimeout = 300;
  const resultsPerPage = 10;
  const customReprestation =
    "custom:(patientId,uuid,identifiers,display,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,display),attributes:(value,attributeType:(name)))";

  const [searchResults, setSearchResults] = useState<Array<SearchedPatient>>(
    []
  );
  const [emptyResult, setEmptyResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagedResults, setPagedResults] = useState<Array<SearchedPatient>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  useEffect(() => {
    currentPage * resultsPerPage > searchResults.length
      ? setShowNextButton(false)
      : setShowNextButton(true);
    currentPage !== 1
      ? setShowPreviousButton(true)
      : setShowPreviousButton(false);
  }, [pagedResults, currentPage, resultsPerPage, searchResults]);

  useEffect(() => {
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

  return (
    <React.Fragment>
      <div className={styles.patientSearchHeader}>
        <input
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
        <div className={styles.emptyResultContainer}>
          <div className={styles.emptyResultCard}>
            <div className={styles.emptyResultText}>
              Sorry, no patient has been found.
            </div>
            <div className={styles.emptyResultText}>
              Try to search with one of:
              <ul className={styles.dash}>
                <li>patient unique ID number</li>
                <li>patient name(s)</li>
              </ul>
            </div>
          </div>
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

type PatientSearchProps = {
  match?: match;
  history?: any;
};
