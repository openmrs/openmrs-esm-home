declare module '*.css';
declare module '*.scss';
declare module '*.png';

declare interface SideNavProps {}

declare module 'react-aria' {
  export const I18nProvider: (...args: unknown) => JSX.Element;
  export type { DateValue } from '@react-types/datepicker';
  export const mergeProps: unknown;
  export const useLocale: unknown;
  export const useDateField: unknown;
  export const useDatePicker: unknown;
  export const useDateSegment: unknown;
  export const useFocusRing: unknown;
  export const useHover: unknown;
  export const useObjectRef: unknown;
}
