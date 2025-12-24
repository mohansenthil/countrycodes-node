// Example demonstrating country-codes-library features
const {
  // Legacy exports
  TwoLetterISORegionCode,
  ThreeLetterISORegionCode,
  CountryCallingCodes,
  CountryCurrencyCodes,
  CountryCurrencySymbols,
  USAStateCode,
  CanadaProvinceCode,
  ChinaProvinceCode,
  
  // Unified country data
  CountryData,
  getAllCountries,
  getAllCountryNames,
  
  // Lookup functions
  getCountryByCode2,
  getCountryByCode3,
  getCountryByName,
  getCountriesByCurrency,
  getCountriesByCallingCode,
  
  // Utility functions
  searchCountries,
  convertCountryCode,
  getCallingCode,
  getCurrencyCode,
  getCurrencySymbol,
  getAllCurrencies,
  getAllCallingCodes,
  
  // Validation functions
  isValidCountryCode2,
  isValidCountryCode3,
  isValidCountryCode,
  isValidCountryName,
  isValidCurrencyCode,
  isValidCallingCode,
  validatePhoneNumber,
  parsePhoneNumber
} = require('country-codes-library');

console.log('=== Country Codes Library - Examples Demo ===\n');

// Legacy API Examples
console.log('LEGACY API EXAMPLES');
console.log('-------------------');
console.log(`USA's Two Letter Country Code is ${TwoLetterISORegionCode.UnitedStates}`);
console.log(`India's Three Letter Country Code is ${ThreeLetterISORegionCode.India}`);
console.log(`Germany's Telephone Code is ${CountryCallingCodes.Germany}`);
console.log(`Alabama's Two Letter State Code is ${USAStateCode.Alabama}`);
console.log(`Ontario's Two Letter Province Code is ${CanadaProvinceCode.Ontario}`);
console.log(`Beijing's Two Letter Province Code is ${ChinaProvinceCode.Beijing}`);
console.log(`Bangladesh's Currency Code is ${CountryCurrencyCodes.Bangladesh}`);
console.log(`Japan's Currency Symbol is ${CountryCurrencySymbols.Japan}`);

// New API Examples
console.log('\n\n1. UNIFIED COUNTRY DATA');
console.log('------------------------');
const usa = CountryData.UnitedStates;
console.log('USA data:', JSON.stringify(usa, null, 2));
console.log('\nTotal countries:', getAllCountries().length);
console.log('First 5 country names:', getAllCountryNames().slice(0, 5).join(', '));

console.log('\n\n2. REVERSE LOOKUPS');
console.log('------------------');
const byCode2 = getCountryByCode2('GB');
console.log('Country by code2 "GB":', byCode2.name);

const byCode3 = getCountryByCode3('JPN');
console.log('Country by code3 "JPN":', byCode3.name);

const byName = getCountryByName('germany');
console.log('Country by name "germany":', byName.code2);

console.log('\n\n3. CURRENCY LOOKUPS');
console.log('-------------------');
const euroCountries = getCountriesByCurrency('EUR');
console.log(`Countries using EUR: ${euroCountries.length}`);
console.log('First 5 EUR countries:', euroCountries.slice(0, 5).map(c => c.name).join(', '));

const allCurrencies = getAllCurrencies();
console.log(`\nTotal unique currencies: ${allCurrencies.length}`);
console.log('First 10 currencies:', allCurrencies.slice(0, 10).join(', '));

console.log('\n\n4. CALLING CODE LOOKUPS');
console.log('-----------------------');
const plusOneCountries = getCountriesByCallingCode('+1');
console.log('Countries with +1 calling code:', plusOneCountries.map(c => c.name).join(', '));

const allCallingCodes = getAllCallingCodes();
console.log(`\nTotal unique calling codes: ${allCallingCodes.length}`);
console.log('First 10 calling codes:', allCallingCodes.slice(0, 10).join(', '));

console.log('\n\n5. SEARCH COUNTRIES');
console.log('-------------------');
const searchResults = searchCountries('island');
console.log('Countries with "island" in name:', searchResults.map(c => c.name).join(', '));

console.log('\n\n6. CODE CONVERSION');
console.log('------------------');
console.log('US -> code3:', convertCountryCode('US', 'code3'));
console.log('GBR -> code2:', convertCountryCode('GBR', 'code2'));
console.log('DEU -> code2:', convertCountryCode('DEU', 'code2'));

console.log('\n\n7. QUICK GETTERS');
console.log('----------------');
console.log('Calling code for Japan:', getCallingCode('Japan'));
console.log('Currency code for UK:', getCurrencyCode('GB'));
console.log('Currency symbol for India:', getCurrencySymbol('India'));

console.log('\n\n8. VALIDATION');
console.log('-------------');
console.log('Is "US" valid code2?', isValidCountryCode2('US'));
console.log('Is "XX" valid code2?', isValidCountryCode2('XX'));
console.log('Is "USA" valid code3?', isValidCountryCode3('USA'));
console.log('Is "Germany" valid country?', isValidCountryName('Germany'));
console.log('Is "USD" valid currency?', isValidCurrencyCode('USD'));
console.log('Is "+1" valid calling code?', isValidCallingCode('+1'));

console.log('\n\n9. PHONE VALIDATION');
console.log('-------------------');
const phoneResult = validatePhoneNumber('(202) 555-1234', 'US');
console.log('US phone validation:', JSON.stringify(phoneResult, null, 2));

const internationalResult = parsePhoneNumber('+44 20 7946 0958');
console.log('\nInternational phone parse:', JSON.stringify(internationalResult, null, 2));

console.log('\n=== Demo Complete ===\n');
