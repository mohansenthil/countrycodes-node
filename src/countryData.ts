import { TwoLetterISORegionCode } from './twoLetterISORegionCode';
import { ThreeLetterISORegionCode } from './threeLetterISORegionCode';
import { CountryCallingCodes } from './countryCallingCodes';
import { CountryCurrencyCodes } from './countryCurrencyCodes';
import { CountryCurrencySymbols } from './countryCurrencySymbols';
import { CountryNames } from './countryNames';
import { Country } from './types';

/**
 * Unified country data combining all available information
 */
export const CountryData: Record<string, Country> = {};

// Build the unified country data from existing constants
for (const countryName in TwoLetterISORegionCode) {
  const name = countryName as keyof typeof TwoLetterISORegionCode;
  
  CountryData[countryName] = {
    name: CountryNames[countryName] || countryName,
    code2: TwoLetterISORegionCode[name] || '',
    code3: (ThreeLetterISORegionCode as any)[name] || '',
    callingCode: (CountryCallingCodes as any)[name] || '',
    currencyCode: (CountryCurrencyCodes as any)[name] || '',
    currencySymbol: (CountryCurrencySymbols as any)[name] || '',
  };
}

/**
 * Get all countries as an array
 */
export function getAllCountries(): Country[] {
  return Object.values(CountryData);
}

/**
 * Get all country names
 */
export function getAllCountryNames(): string[] {
  return Object.keys(CountryData);
}

