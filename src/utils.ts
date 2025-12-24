import { CountryData, getAllCountries } from './countryData';
import { Country, LookupResult, SearchOptions } from './types';

/**
 * Get country information by 2-letter ISO code
 * @param code - ISO 3166-1 alpha-2 code (e.g., "US", "GB", "CN")
 * @returns Country object or null if not found
 * @example
 * ```ts
 * const country = getCountryByCode2("US");
 * // Returns: { name: "UnitedStates", code2: "US", code3: "USA", ... }
 * ```
 */
export function getCountryByCode2(code: string): Country | null {
  const upperCode = code.toUpperCase();
  
  for (const country of getAllCountries()) {
    if (country.code2.toUpperCase() === upperCode) {
      return country;
    }
  }
  
  return null;
}

/**
 * Get country information by 3-letter ISO code
 * @param code - ISO 3166-1 alpha-3 code (e.g., "USA", "GBR", "CHN")
 * @returns Country object or null if not found
 * @example
 * ```ts
 * const country = getCountryByCode3("USA");
 * // Returns: { name: "UnitedStates", code2: "US", code3: "USA", ... }
 * ```
 */
export function getCountryByCode3(code: string): Country | null {
  const upperCode = code.toUpperCase();
  
  for (const country of getAllCountries()) {
    if (country.code3.toUpperCase() === upperCode) {
      return country;
    }
  }
  
  return null;
}

/**
 * Get country information by name
 * @param name - Country name (e.g., "UnitedStates", "United States")
 * @returns Country object or null if not found
 * @example
 * ```ts
 * const country = getCountryByName("UnitedStates");
 * // Returns: { name: "UnitedStates", code2: "US", code3: "USA", ... }
 * ```
 */
export function getCountryByName(name: string): Country | null {
  // Try exact match first
  if (CountryData[name]) {
    return CountryData[name];
  }
  
  // Try case-insensitive match
  const lowerName = name.toLowerCase().replace(/\s+/g, '');
  
  for (const countryName in CountryData) {
    if (countryName.toLowerCase().replace(/\s+/g, '') === lowerName) {
      return CountryData[countryName];
    }
  }
  
  return null;
}

/**
 * Get all countries that use a specific currency
 * @param currencyCode - ISO 4217 currency code (e.g., "USD", "EUR")
 * @returns Array of countries using the currency
 * @example
 * ```ts
 * const countries = getCountriesByCurrency("EUR");
 * // Returns array of European countries using Euro
 * ```
 */
export function getCountriesByCurrency(currencyCode: string): Country[] {
  const upperCurrency = currencyCode.toUpperCase();
  
  return getAllCountries().filter(
    country => country.currencyCode.toUpperCase() === upperCurrency
  );
}

/**
 * Get all countries with a specific calling code
 * @param callingCode - International calling code (e.g., "+1", "+44")
 * @returns Array of countries with the calling code
 * @example
 * ```ts
 * const countries = getCountriesByCallingCode("+1");
 * // Returns: [USA, Canada, and other +1 countries]
 * ```
 */
export function getCountriesByCallingCode(callingCode: string): Country[] {
  // Normalize calling code (add + if missing)
  const normalizedCode = callingCode.startsWith('+') ? callingCode : `+${callingCode}`;
  
  return getAllCountries().filter(
    country => country.callingCode === normalizedCode
  );
}

/**
 * Search countries by name (supports partial matching)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching countries
 * @example
 * ```ts
 * const results = searchCountries("united");
 * // Returns: [UnitedStates, UnitedKingdom, UnitedArabEmirates]
 * ```
 */
export function searchCountries(countryName: string, options: SearchOptions = {}): Country[] {
  const { caseSensitive = false, exactMatch = false } = options;
  
  const searchQuery = caseSensitive ? countryName : countryName.toLowerCase();
  
  return getAllCountries().filter(country => {
    const countryName = caseSensitive ? country.name : country.name.toLowerCase();
    
    if (exactMatch) {
      return countryName === searchQuery;
    }
    
    return countryName.includes(searchQuery);
  });
}

/**
 * Convert between 2-letter and 3-letter country codes
 * @param code - Country code to convert
 * @param targetFormat - Target format ('code2' or 'code3')
 * @returns Converted code or null if not found
 * @example
 * ```ts
 * convertCountryCode("US", "code3"); // Returns: "USA"
 * convertCountryCode("GBR", "code2"); // Returns: "GB"
 * ```
 */
export function convertCountryCode(
  code: string,
  targetFormat: 'code2' | 'code3'
): string | null {
  // Try as 2-letter code first
  let country = getCountryByCode2(code);
  
  // If not found, try as 3-letter code
  if (!country) {
    country = getCountryByCode3(code);
  }
  
  if (!country) {
    return null;
  }
  
  return targetFormat === 'code2' ? country.code2 : country.code3;
}

/**
 * Get calling code for a country
 * @param countryIdentifier - Country name, code2, or code3
 * @returns Calling code or null if not found
 * @example
 * ```ts
 * getCallingCode("US"); // Returns: "+1"
 * getCallingCode("UnitedStates"); // Returns: "+1"
 * ```
 */
export function getCallingCode(countryIdentifier: string): string | null {
  let country = getCountryByName(countryIdentifier);
  
  if (!country) {
    country = getCountryByCode2(countryIdentifier);
  }
  
  if (!country) {
    country = getCountryByCode3(countryIdentifier);
  }
  
  return country ? country.callingCode : null;
}

/**
 * Get currency code for a country
 * @param countryIdentifier - Country name, code2, or code3
 * @returns Currency code or null if not found
 * @example
 * ```ts
 * getCurrencyCode("US"); // Returns: "USD"
 * getCurrencyCode("Germany"); // Returns: "EUR"
 * ```
 */
export function getCurrencyCode(countryIdentifier: string): string | null {
  let country = getCountryByName(countryIdentifier);
  
  if (!country) {
    country = getCountryByCode2(countryIdentifier);
  }
  
  if (!country) {
    country = getCountryByCode3(countryIdentifier);
  }
  
  return country ? country.currencyCode : null;
}

/**
 * Get currency symbol for a country
 * @param countryIdentifier - Country name, code2, or code3
 * @returns Currency symbol or null if not found
 * @example
 * ```ts
 * getCurrencySymbol("US"); // Returns: "$"
 * getCurrencySymbol("Japan"); // Returns: "¥"
 * ```
 */
export function getCurrencySymbol(countryIdentifier: string): string | null {
  let country = getCountryByName(countryIdentifier);
  
  if (!country) {
    country = getCountryByCode2(countryIdentifier);
  }
  
  if (!country) {
    country = getCountryByCode3(countryIdentifier);
  }
  
  return country ? country.currencySymbol : null;
}

/**
 * Get all unique currencies used worldwide
 * @returns Array of unique currency codes
 */
export function getAllCurrencies(): string[] {
  const currencies = new Set<string>();
  
  getAllCountries().forEach(country => {
    if (country.currencyCode) {
      currencies.add(country.currencyCode);
    }
  });
  
  return Array.from(currencies).sort();
}

/**
 * Get all unique calling codes
 * @returns Array of unique calling codes
 */
export function getAllCallingCodes(): string[] {
  const codes = new Set<string>();
  
  getAllCountries().forEach(country => {
    if (country.callingCode && country.callingCode !== '+0') {
      codes.add(country.callingCode);
    }
  });
  
  return Array.from(codes).sort((a, b) => {
    const numA = parseInt(a.replace('+', ''));
    const numB = parseInt(b.replace('+', ''));
    return numA - numB;
  });
}

