# Country Codes Library

The Country Code Library provides a collection of two-letter and three-letter country codes according to the ISO 3166-1 standard,
as well as it provides USA, China and Canada Province codes (State codes / adminstrative division codes).
In addition, it includes telephone calling codes, currency codes, currency Symbols for countries across the world. 

## Installation

To install the Country Codes Library:

```bash
npm install country-codes-lib
```

## Usage

After installing the Country Codes Library, you can use it in your project to retrieve two-letter, three-letter country codes, telephone calling codes, state/province/administrative division codes, and currency codes. Here are some examples:

## JavaScript Example

```js
const { TwoLetterISORegionCode, ThreeLetterISORegionCode, CountryCallingCodes, USAStateCode, CanadaProvinceCode, ChinaProvinceCode, CountryCurrencyCodes, CountryCurrencySymbols } = require('country-codes-lib');

console.log(`USA's Two Letter Country Code is ${TwoLetterISORegionCode.UnitedStates}`);
console.log(`India's Three Letter Country Code is ${ThreeLetterISORegionCode.India}`);
console.log(`Germany's Telephone Code is ${CountryCallingCodes.Germany}`);
console.log(`Alabama's Two Letter State Code is ${USAStateCode.Alabama}`);
console.log(`Ontario's Two Letter Province Code is ${CanadaProvinceCode.Ontario}`);
console.log(`Beijing's Two Letter Province Code is ${ChinaProvinceCode.Beijing}`);
console.log(`Bangladesh's Currency Code is ${CountryCurrencyCodes.Bangladesh}`);
console.log(`Japan's Currency Symbol is ${CountryCurrencySymbols.Japan}`);
```

## TypeScript Example

```ts
import { TwoLetterISORegionCode, ThreeLetterISORegionCode, CountryCallingCodes, USAStateCode, CanadaProvinceCode, ChinaProvinceCode, CountryCurrencyCodes, CountryCurrencySymbols } from 'country-codes-lib';

console.log(`USA's Two Letter Country Code is ${TwoLetterISORegionCode.UnitedStates}`);
console.log(`India's Three Letter Country Code is ${ThreeLetterISORegionCode.India}`);
console.log(`Germany's Telephone Code is ${CountryCallingCodes.Germany}`);
console.log(`Alabama's Two Letter State Code is ${USAStateCode.Alabama}`);
console.log(`Ontario's Two Letter Province Code is ${CanadaProvinceCode.Ontario}`);
console.log(`Beijing's Two Letter Province Code is ${ChinaProvinceCode.Beijing}`);
console.log(`Bangladesh's Currency Code is ${CountryCurrencyCodes.Bangladesh}`);
console.log(`Japan's Currency Symbol is ${CountryCurrencySymbols.Japan}`);

```

## Output
```console
USA's Two Letter Country Code is US
India's Three Letter Country Code is IND
Germany's Telephone Code is +49
Alabama's Two Letter State Code is AL
Ontario's Two Letter Province Code is ON
Beijing's Two Letter Province Code is BJ
Bangladesh's Currency Code is BDT
Japan's Currency Symbol is ¥
```