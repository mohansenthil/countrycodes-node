/**
 * Represents a country with all available information
 */
export interface Country {
  /** Full country name (e.g., "United States") */
  name: string;
  /** ISO 3166-1 alpha-2 code (e.g., "US") */
  code2: string;
  /** ISO 3166-1 alpha-3 code (e.g., "USA") */
  code3: string;
  /** International calling code (e.g., "+1") */
  callingCode: string;
  /** ISO 4217 currency code (e.g., "USD") */
  currencyCode: string;
  /** Currency symbol (e.g., "$") */
  currencySymbol: string;
}

/**
 * Result of a reverse lookup operation
 */
export interface LookupResult {
  /** Country name */
  country: string;
  /** ISO 3166-1 alpha-2 code */
  code2: string;
  /** ISO 3166-1 alpha-3 code */
  code3: string;
}

/**
 * Options for search and filter operations
 */
export interface SearchOptions {
  /** Case-sensitive search */
  caseSensitive?: boolean;
  /** Exact match only */
  exactMatch?: boolean;
}

/**
 * Phone number validation result
 */
export interface PhoneValidationResult {
  /** Whether the phone number is valid */
  isValid: boolean;
  /** Formatted phone number */
  formatted?: string;
  /** Country code detected */
  countryCode?: string;
  /** Error message if invalid */
  error?: string;
}

/**
 * Union type of all country names for better autocomplete
 */
export type CountryName = keyof typeof import('./twoLetterISORegionCode').TwoLetterISORegionCode;

/**
 * Union type of all 2-letter country codes
 */
export type CountryCode2 = string;

/**
 * Union type of all 3-letter country codes
 */
export type CountryCode3 = string;

