export interface SearchedPatient {
  patientId: string;
  uuid: string;
  identifiers: Array<Identifier>;
  person: {
    age: number;
    birthdate: Date;
    display: string;
    gender: string;
  };
  display: string;
}

export type Identifier = {
  display: string;
  uuid: string;
  identifier: string;
  identifierType: {
    uuid: string;
    display: string;
    links: [
      {
        rel: string;
        uri: string;
      }
    ];
  };
  location: {
    uuid: string;
    display: string;
    links: [
      {
        rel: string;
        uri: string;
      }
    ];
  };
  preferred: string;
  voided: string;
  links: [
    {
      rel: string;
      uri: string;
    },
    {
      rel: string;
      uri: string;
    }
  ];
  resourceVersion: string;
};
