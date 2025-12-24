# Country Codes Library

A comprehensive TypeScript/JavaScript library providing country codes, calling codes, currencies, and administrative divisions with powerful utility functions for lookups, validation, and data manipulation.

## 🚀 Features

- ✅ **ISO 3166-1** two-letter and three-letter country codes
- ✅ **International calling codes** for all countries
- ✅ **Currency codes (ISO 4217)** and symbols
- ✅ **Administrative divisions** for USA, Canada, and China
- ✅ **Unified country data** - all information in one place
- ✅ **Utility functions** - reverse lookups, search, and conversion
- ✅ **Validation functions** - validate codes, currencies, phone numbers
- ✅ **TypeScript support** - full type definitions included
- ✅ **Tree-shakeable** - import only what you need
- ✅ **Zero dependencies** - lightweight and fast

## 📦 Installation

```bash
npm install country-codes-library
```

## 📖 Usage

### Basic Usage (Original API - Still Supported)

```js
const { 
  TwoLetterISORegionCode, 
  ThreeLetterISORegionCode, 
  CountryCallingCodes, 
  CountryCurrencyCodes,
  CountryCurrencySymbols,
  USAStateCode,
  CanadaProvinceCode,
  ChinaProvinceCode
} = require('country-codes-library');

console.log(TwoLetterISORegionCode.UnitedStates);  // "US"
console.log(ThreeLetterISORegionCode.India);       // "IND"
console.log(CountryCallingCodes.Germany);          // "+49"
console.log(CountryCurrencyCodes.Japan);           // "JPY"
console.log(CountryCurrencySymbols.Japan);         // "¥"
console.log(USAStateCode.California);              // "CA"
console.log(CanadaProvinceCode.Ontario);           // "ON"
console.log(ChinaProvinceCode.Beijing);            // "BJ"
```

### ⭐ NEW: Unified Country Data

Access all country information in one object:

```ts
import { CountryData, getAllCountries } from 'country-codes-library';

// Get specific country
const usa = CountryData.UnitedStates;
console.log(usa);
/*
{
  name: "UnitedStates",
  code2: "US",
  code3: "USA",
  callingCode: "+1",
  currencyCode: "USD",
  currencySymbol: "$"
}
*/

// Get all countries as array
const allCountries = getAllCountries();
console.log(allCountries.length);  // 249 countries
```

### ⭐ NEW: Utility Functions

#### Reverse Lookups

```ts
import { 
  getCountryByCode2,
  getCountryByCode3,
  getCountryByName,
  getCountriesByCurrency,
  getCountriesByCallingCode
} from 'country-codes-library';

// Find country by 2-letter code
const country = getCountryByCode2('US');
console.log(country.name);  // "UnitedStates"

// Find country by 3-letter code
const country2 = getCountryByCode3('GBR');
console.log(country2.code2);  // "GB"

// Find country by name (case-insensitive, handles spaces)
const country3 = getCountryByName('united states');
console.log(country3.code2);  // "US"

// Find all countries using Euro
const euroCountries = getCountriesByCurrency('EUR');
console.log(euroCountries.length);  // 35+ countries

// Find all countries with +1 calling code
const nanpaCountries = getCountriesByCallingCode('+1');
// Returns USA, Canada, and Caribbean countries
```

#### Search and Convert

```ts
import { 
  searchCountries,
  convertCountryCode,
  getCallingCode,
  getCurrencyCode,
  getCurrencySymbol
} from 'country-codes-library';

// Search countries by partial name
const results = searchCountries('united');
// Returns: UnitedStates, UnitedKingdom, UnitedArabEmirates

// Convert between code formats
convertCountryCode('US', 'code3');   // "USA"
convertCountryCode('GBR', 'code2');  // "GB"

// Get specific data by any identifier (name, code2, or code3)
getCallingCode('US');              // "+1"
getCallingCode('Germany');         // "+49"
getCurrencyCode('JP');             // "JPY"
getCurrencySymbol('UnitedKingdom'); // "£"
```

#### List Functions

```ts
import { getAllCurrencies, getAllCallingCodes } from 'country-codes-library';

// Get all unique currencies used worldwide
const currencies = getAllCurrencies();
// ["AED", "AFN", "ALL", ..., "ZMW", "ZWL"]

// Get all unique calling codes
const callingCodes = getAllCallingCodes();
// ["+1", "+7", "+20", ..., "+998"]
```

### ⭐ NEW: Validation Functions

```ts
import {
  isValidCountryCode2,
  isValidCountryCode3,
  isValidCountryCode,
  isValidCountryName,
  isValidCurrencyCode,
  isValidCallingCode,
  validatePhoneNumber,
  parsePhoneNumber
} from 'country-codes-library';

// Validate country codes
isValidCountryCode2('US');      // true
isValidCountryCode2('XX');      // false
isValidCountryCode3('USA');     // true
isValidCountryCode('US');       // true (accepts 2 or 3 letter)
isValidCountryCode('USA');      // true

// Validate country names
isValidCountryName('Germany');        // true
isValidCountryName('united states');  // true (case-insensitive)
isValidCountryName('Atlantis');       // false

// Validate currency codes
isValidCurrencyCode('USD');     // true
isValidCurrencyCode('EUR');     // true
isValidCurrencyCode('XXX');     // false

// Validate calling codes
isValidCallingCode('+1');       // true
isValidCallingCode('44');       // true (+ is optional)
isValidCallingCode('+999');     // false

// Validate phone numbers
const result = validatePhoneNumber('(202) 555-1234', 'US');
console.log(result);
/*
{
  isValid: true,
  formatted: "+1-2025551234",
  countryCode: "+1"
}
*/

// Parse international phone numbers
const parsed = parsePhoneNumber('+44 20 7946 0958');
console.log(parsed);
/*
{
  isValid: true,
  formatted: "+442079460958",
  countryCode: "+44"
}
*/
```

### TypeScript Support

Full TypeScript definitions with autocomplete:

```ts
import type { 
  Country, 
  CountryName, 
  CountryCode2, 
  CountryCode3,
  SearchOptions,
  PhoneValidationResult 
} from 'country-codes-library';

// Strong typing for country data
const country: Country = {
  name: 'UnitedStates',
  code2: 'US',
  code3: 'USA',
  callingCode: '+1',
  currencyCode: 'USD',
  currencySymbol: '$'
};

// Use type-safe country names for autocomplete
const name: CountryName = 'Germany';  // Autocomplete available!

// Search with options
const options: SearchOptions = {
  caseSensitive: false,
  exactMatch: true
};
```

## 📚 API Reference

### Constants (Original API)

- `TwoLetterISORegionCode` - ISO 3166-1 alpha-2 codes
- `ThreeLetterISORegionCode` - ISO 3166-1 alpha-3 codes
- `CountryCallingCodes` - International dialing codes
- `CountryCurrencyCodes` - ISO 4217 currency codes
- `CountryCurrencySymbols` - Currency symbols
- `USAStateCode` - US state 2-letter codes
- `CanadaProvinceCode` - Canadian province codes
- `ChinaProvinceCode` - Chinese province codes

### New Features

#### Data Objects
- `CountryData` - Unified country information object
- `getAllCountries()` - Returns array of all countries
- `getAllCountryNames()` - Returns array of country names

#### Lookup Functions
- `getCountryByCode2(code)` - Find by 2-letter code
- `getCountryByCode3(code)` - Find by 3-letter code
- `getCountryByName(name)` - Find by country name
- `getCountriesByCurrency(code)` - Find all countries using a currency
- `getCountriesByCallingCode(code)` - Find all countries with calling code

#### Utility Functions
- `searchCountries(countryName, options?)` - Search countries by name
- `convertCountryCode(code, targetFormat)` - Convert between code formats
- `getCallingCode(countryIdentifier)` - Get calling code for a country
- `getCurrencyCode(countryIdentifier)` - Get currency code for a country
- `getCurrencySymbol(countryIdentifier)` - Get currency symbol for a country
- `getAllCurrencies()` - Get all unique currencies
- `getAllCallingCodes()` - Get all unique calling codes

#### Validation Functions
- `isValidCountryCode2(code)` - Validate 2-letter code
- `isValidCountryCode3(code)` - Validate 3-letter code
- `isValidCountryCode(code)` - Validate any country code
- `isValidCountryName(name)` - Validate country name
- `isValidCurrencyCode(code)` - Validate currency code
- `isValidCallingCode(code)` - Validate calling code
- `validatePhoneNumber(number, country)` - Validate phone number
- `parsePhoneNumber(number)` - Parse international phone number

## 🎯 Use Cases

- **Form validation** - Validate country codes and phone numbers
- **Phone number formatting** - Format international phone numbers
- **Currency conversion apps** - Get currency info by country
- **E-commerce** - Display correct currency symbols
- **Travel apps** - Show calling codes for countries
- **Data normalization** - Convert between different code formats
- **Autocomplete** - Search countries for dropdowns
- **Data validation** - Ensure data quality in databases

## 🔄 Migration from v1.x

The library is **100% backwards compatible**. All original exports still work:

```js
// v1.x code still works
const { TwoLetterISORegionCode } = require('country-codes-library');
console.log(TwoLetterISORegionCode.UnitedStates); // Still works!
```

Simply add new features when you're ready:

```js
// Start using new features gradually
const { getCountryByCode2 } = require('country-codes-library');
const country = getCountryByCode2('US');
```

## 📊 Data Coverage

- **249 countries and territories**
- **170+ unique currencies**
- **240+ calling codes**
- **US States**: 51 (50 states + DC)
- **Canadian Provinces**: 13
- **Chinese Provinces**: 34

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## 🔗 Links

- [GitHub Repository](https://github.com/mohansenthil/countrycodes-node)
- [npm Package](https://www.npmjs.com/package/country-codes-library)
- [Issues](https://github.com/mohansenthil/countrycodes-node/issues)

## ⭐ Show Your Support

If this library helps you, please give it a star on GitHub!