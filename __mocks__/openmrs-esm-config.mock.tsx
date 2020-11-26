export const defineConfigSchema = jest.fn();

export const validators = {
  isUrlWithTemplateParameters: jest.fn()
};

export const interpolateString = jest.fn().mockImplementation(s => s);

export const Type = {
  Array: "Array",
  Boolean: "Boolean",
  ConceptUuid: "ConceptUuid",
  Number: "Number",
  Object: "Object",
  String: "String",
  UUID: "UUID"
};
