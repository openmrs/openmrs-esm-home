import { Type, validators } from '@openmrs/esm-framework';

export const esmHomeSchema = {
  buttons: {
    enabled: {
      _type: Type.Boolean,
      _default: true,
      _description: 'Whether to show big buttons on the home page (including extensions)',
    },
    list: {
      _type: Type.Array,
      _elements: {
        label: { _type: Type.String },
        link: {
          _type: Type.String,
          _validators: [validators.isUrl],
        },
        requiredPrivilege: {
          _type: Type.String,
        },
        spa: {
          _type: Type.Boolean,
          _default: false,
        },
      },
      _default: [],
      _description: 'Custom buttons to add, which will come after the button extensions',
    },
  },
  search: {
    patientResultUrl: {
      _default: '${openmrsSpaBase}/patient/${patientUuid}/chart',
      _description: 'Where clicking a patient result takes the user. Accepts template parameter ${patientUuid}',
      _validators: [validators.isUrlWithTemplateParameters(['patientUuid'])],
    },
  },
  widgets: {
    enabled: {
      _type: Type.Boolean,
      _default: true,
      _description: 'Whether to show widgets on the home page (including extensions)',
    },
  },
  externalRefLinks: {
    enabled: {
      _type: Type.Boolean,
      _default: true,
      _description: 'Whether to show external links in the app menu',
    },
    links: {
      _type: Type.Array,
      _elements: {
        title: {
          _type: Type.String,
          _description: 'Title of the link',
        },
        redirect: {
          _type: Type.String,
          _description: 'Link to redirect to',
        },
      },
      _default: [
        {
          title: 'Pharmacy',
          redirect: '${openmrsSpaBase}/pharmacy',
        },
        {
          title: 'Laboratory',
          redirect: '${openmrsSpaBase}/laboratory',
        },
        {
          title: 'Analytics',
          redirect: '${openmrsSpaBase}/analytics',
        },
      ],
      _description: 'The links to be showcased in the app menu',
    },
  },
};
