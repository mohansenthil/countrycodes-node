// Original exports - backwards compatible
export { TwoLetterISORegionCode } from './twoLetterISORegionCode';
export { ThreeLetterISORegionCode } from './threeLetterISORegionCode';
export { CountryCallingCodes } from './countryCallingCodes';
export { CountryCurrencySymbols } from './countryCurrencySymbols';
export { CountryCurrencyCodes } from './countryCurrencyCodes';
export { ChinaProvinceCode } from './China/chinaProvinceCode';
export { CanadaProvinceCode } from './Canada/canadaProvinceCode';
export { USAStateCode } from './UnitedStates/USAStateCode';

// New unified country data
export { CountryData, getAllCountries, getAllCountryNames } from './countryData';

// TypeScript types
export type {
  Country,
  LookupResult,
  SearchOptions,
  PhoneValidationResult,
  CountryName,
  CountryCode2,
  CountryCode3
} from './types';

// Utility functions
export {
  getCountryByCode2,
  getCountryByCode3,
  getCountryByName,
  getCountriesByCurrency,
  getCountriesByCallingCode,
  searchCountries,
  convertCountryCode,
  getCallingCode,
  getCurrencyCode,
  getCurrencySymbol,
  getAllCurrencies,
  getAllCallingCodes
} from './utils';

// Validation functions
export {
  isValidCountryCode2,
  isValidCountryCode3,
  isValidCountryCode,
  isValidCountryName,
  isValidCurrencyCode,
  isValidCallingCode,
  validatePhoneNumber,
  parsePhoneNumber
} from './validators';