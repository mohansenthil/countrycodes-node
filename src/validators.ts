import { getCountryByCode2, getCountryByCode3, getCountryByName, getCallingCode } from './utils';
import { PhoneValidationResult } from './types';

/**
 * Validate if a string is a valid ISO 3166-1 alpha-2 country code
 * @param code - The code to validate
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCountryCode2("US"); // true
 * isValidCountryCode2("XX"); // false
 * ```
 */
export function isValidCountryCode2(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  if (code.length !== 2) {
    return false;
  }
  
  return getCountryByCode2(code) !== null;
}

/**
 * Validate if a string is a valid ISO 3166-1 alpha-3 country code
 * @param code - The code to validate
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCountryCode3("USA"); // true
 * isValidCountryCode3("XXX"); // false
 * ```
 */
export function isValidCountryCode3(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  if (code.length !== 3) {
    return false;
  }
  
  return getCountryByCode3(code) !== null;
}

/**
 * Validate if a string is a valid country code (2-letter or 3-letter)
 * @param code - The code to validate
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCountryCode("US"); // true
 * isValidCountryCode("USA"); // true
 * isValidCountryCode("INVALID"); // false
 * ```
 */
export function isValidCountryCode(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  if (code.length === 2) {
    return isValidCountryCode2(code);
  }
  
  if (code.length === 3) {
    return isValidCountryCode3(code);
  }
  
  return false;
}

/**
 * Validate if a string is a valid country name
 * @param name - The country name to validate
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCountryName("UnitedStates"); // true
 * isValidCountryName("United States"); // true (case-insensitive)
 * isValidCountryName("Atlantis"); // false
 * ```
 */
export function isValidCountryName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  return getCountryByName(name) !== null;
}

/**
 * Validate if a currency code is valid (ISO 4217)
 * @param currencyCode - The currency code to validate
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCurrencyCode("USD"); // true
 * isValidCurrencyCode("EUR"); // true
 * isValidCurrencyCode("XXX"); // false (not used by any country)
 * ```
 */
export function isValidCurrencyCode(currencyCode: string): boolean {
  if (!currencyCode || typeof currencyCode !== 'string') {
    return false;
  }
  
  if (currencyCode.length !== 3) {
    return false;
  }
  
  const { getAllCountries } = require('./countryData');
  const countries = getAllCountries();
  
  return countries.some(
    (country: any) => country.currencyCode.toUpperCase() === currencyCode.toUpperCase()
  );
}

/**
 * Validate if a calling code is valid
 * @param callingCode - The calling code to validate (with or without +)
 * @returns true if valid, false otherwise
 * @example
 * ```ts
 * isValidCallingCode("+1"); // true
 * isValidCallingCode("44"); // true
 * isValidCallingCode("+999"); // false
 * ```
 */
export function isValidCallingCode(callingCode: string): boolean {
  if (!callingCode || typeof callingCode !== 'string') {
    return false;
  }
  
  const normalizedCode = callingCode.startsWith('+') ? callingCode : `+${callingCode}`;
  
  const { getAllCountries } = require('./countryData');
  const countries = getAllCountries();
  
  return countries.some(
    (country: any) => country.callingCode === normalizedCode
  );
}

/**
 * Basic phone number validation for a specific country
 * @param phoneNumber - The phone number to validate
 * @param countryIdentifier - Country name, code2, or code3
 * @returns Validation result object
 * @example
 * ```ts
 * validatePhoneNumber("2025551234", "US");
 * // Returns: { isValid: true, formatted: "+1-202-555-1234", countryCode: "+1" }
 * ```
 */
export function validatePhoneNumber(
  phoneNumber: string,
  countryIdentifier: string
): PhoneValidationResult {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }
  
  const callingCode = getCallingCode(countryIdentifier);
  
  if (!callingCode) {
    return {
      isValid: false,
      error: 'Invalid country identifier'
    };
  }
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return {
      isValid: false,
      error: 'Phone number must contain digits'
    };
  }
  
  // Basic length validation (most phone numbers are between 7-15 digits)
  if (digits.length < 7 || digits.length > 15) {
    return {
      isValid: false,
      error: 'Phone number length is invalid'
    };
  }
  
  // Format: +[country code]-[number]
  const formatted = `${callingCode}-${digits}`;
  
  return {
    isValid: true,
    formatted,
    countryCode: callingCode
  };
}

/**
 * Parse a phone number and detect the country
 * @param phoneNumber - The phone number to parse (with calling code)
 * @returns Validation result with detected country
 * @example
 * ```ts
 * parsePhoneNumber("+1-202-555-1234");
 * // Returns: { isValid: true, formatted: "+1-2025551234", countryCode: "+1" }
 * ```
 */
export function parsePhoneNumber(phoneNumber: string): PhoneValidationResult {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }
  
  // Extract calling code if present
  const match = phoneNumber.match(/^\+?(\d{1,3})/);
  
  if (!match) {
    return {
      isValid: false,
      error: 'Could not detect calling code'
    };
  }
  
  const detectedCode = `+${match[1]}`;
  
  if (!isValidCallingCode(detectedCode)) {
    return {
      isValid: false,
      error: 'Invalid calling code'
    };
  }
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return {
      isValid: false,
      error: 'Phone number must contain digits'
    };
  }
  
  return {
    isValid: true,
    formatted: `+${digits}`,
    countryCode: detectedCode
  };
}

