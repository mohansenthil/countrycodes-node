const { TwoLetterISORegionCode, ThreeLetterISORegionCode, CountryCallingCodes, USAStateCode, CanadaProvinceCode, ChinaProvinceCode, CountryCurrencyCodes, CountryCurrencySymbols } = require('country-codes-library');

console.log(`USA's Two Letter Country Code is ${TwoLetterISORegionCode.UnitedStates}`);
console.log(`India's Three Letter Country Code is ${ThreeLetterISORegionCode.India}`);
console.log(`Germany's Telephone Code is ${CountryCallingCodes.Germany}`);
console.log(`Alabama's Two Letter State Code is ${USAStateCode.Alabama}`);
console.log(`Ontario's Two Letter Province Code is ${CanadaProvinceCode.Ontario}`);
console.log(`Beijing's Two Letter Province Code is ${ChinaProvinceCode.Beijing}`);
console.log(`Bangladesh's Currency Code is ${CountryCurrencyCodes.Bangladesh}`);
console.log(`Japan's Currency Symbol is ${CountryCurrencySymbols.Japan}`);