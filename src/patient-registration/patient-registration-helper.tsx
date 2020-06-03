export type Patient = {
  identifiers: [
    {
      identifier: string;
      identifierType: string;
      location: string;
      preferred: boolean;
    }
  ];
  person: {
    gender: string;
    age: number;
    birthdate: Date | string;
    names: [
      {
        givenName: string;
        middleName: string;
        familyName: string;
      }
    ];
    addresses: [
      {
        preferred: boolean;
        address1: string;
        address2: string;
        cityVillage: string;
        stateProvince: string;
        country: string;
      }
    ];
  };
};
