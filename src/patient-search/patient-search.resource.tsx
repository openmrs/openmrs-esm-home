import { fhir } from "@openmrs/esm-framework";

export function performPatientSearch(query: string) {
  return fhir.search({
    type: "Patient",
    query: {
      name: query,
      _getpagesoffset: 0,
      _count: 100,
      _summary: "data"
    }
  });
}
