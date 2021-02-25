import React from "react";
import debounce from "lodash-es/debounce";
import isEmpty from "lodash-es/isEmpty";
import Link from "carbon-components-react/es/components/Link";
import PaginationNav from "carbon-components-react/es/components/PaginationNav";
import PatientSearchResults from "../patient-search-result/patient-search-result.component";
import EmptyDataIllustration from "./empty-data-illustration.component";
import { Tile } from "carbon-components-react/es/components/Tile";
import { match } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { performPatientSearch } from "./patient-search.resource";
import { SearchedPatient } from "../types";
import styles from "./patient-search.scss";

interface PatientSearchProps {
  match?: match;
  history?: any;
}

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
  const searchInput = React.useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

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
        setTotalPages(Math.ceil(results.length / resultsPerPage));

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
  }, [searchTerm, customReprestation]);

  const handleChange = debounce(searchTerm => {
    setSearchTerm(searchTerm);
  }, searchTimeout);

  const handleFocus = () => {
    searchInput.current.focus();
  };

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

  const handlePageChange = page => {
    if (page === 0 && currentPage === 0) {
      nextPage();
    } else if (page + 1 > currentPage) {
      nextPage();
    } else if (page + 1 < currentPage) {
      previousPage();
    }
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
      {!isEmpty(searchResults) && (
        <div className={styles.searchResults}>
          <p>
            <span className={styles.resultsText}>
              {t("found", "Found")} {searchResults.length}{" "}
              {t("patient", "patient")}{" "}
              {searchResults.length === 1 ? "chart" : "charts"}{" "}
              {t("containing", "containing")}
            </span>
          </p>
          <p className={styles.searchTerm}>"{searchTerm}"</p>
          <PatientSearchResults
            match={props.match}
            searchTerm={searchTerm}
            patients={pagedResults}
          />
          <div className={styles.pagination}>
            <PaginationNav
              itemsShown={resultsPerPage}
              totalItems={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
      {isEmpty(searchResults) && !emptyResult && (
        <Tile style={{ textAlign: "center" }}>
          <p className={styles.actionText}>
            <span>
              {t("patientSearchText", "Search by patient name OR identifier")}
            </span>
          </p>
        </Tile>
      )}
      {emptyResult && (
        <div className={styles.searchResults}>
          <p>
            <span className={styles.resultsText}>
              {t("searchResultsFor", "Search results for:")}
            </span>
          </p>
          <p className={styles.searchTerm}>"{searchTerm}"</p>
          <Tile style={{ textAlign: "center" }}>
            <EmptyDataIllustration />
            <p className={styles.emptyResultText}>
              {t(
                "noPatientChartsFoundMessage",
                "Sorry, no patient charts have been found"
              )}
            </p>
            <p className={styles.actionText}>
              <span>
                {t(
                  "trySearchWithPatientUniqueID",
                  "Try searching with the patient's unique ID number"
                )}
              </span>
              <br />
              <span>{t("orPatientName", "OR the patient's name(s)")}</span>
            </p>
            <Link onClick={handleFocus}>
              {t("searchAgain", "Search Again")}
            </Link>
          </Tile>
        </div>
      )}
    </React.Fragment>
  );
}

export default PatientSearch;
