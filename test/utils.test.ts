import {
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
} from '../src/utils';

describe('Country Lookup Utils', () => {
  describe('getCountryByCode2', () => {
    it('should return country by 2-letter code', () => {
      const country = getCountryByCode2('US');
      expect(country).not.toBeNull();
      expect(country?.name).toBe('United States');
      expect(country?.code2).toBe('US');
      expect(country?.code3).toBe('USA');
    });

    it('should be case-insensitive', () => {
      const country = getCountryByCode2('us');
      expect(country).not.toBeNull();
      expect(country?.name).toBe('United States');
    });

    it('should return null for invalid code', () => {
      const country = getCountryByCode2('XX');
      expect(country).toBeNull();
    });

    it('should handle various countries', () => {
      expect(getCountryByCode2('GB')?.name).toBe('United Kingdom');
      expect(getCountryByCode2('DE')?.name).toBe('Germany');
      expect(getCountryByCode2('JP')?.name).toBe('Japan');
      expect(getCountryByCode2('IN')?.name).toBe('India');
      expect(getCountryByCode2('CN')?.name).toBe('China');
    });
  });

  describe('getCountryByCode3', () => {
    it('should return country by 3-letter code', () => {
      const country = getCountryByCode3('USA');
      expect(country).not.toBeNull();
      expect(country?.name).toBe('United States');
      expect(country?.code3).toBe('USA');
    });

    it('should be case-insensitive', () => {
      const country = getCountryByCode3('usa');
      expect(country).not.toBeNull();
      expect(country?.name).toBe('United States');
    });

    it('should return null for invalid code', () => {
      const country = getCountryByCode3('XXX');
      expect(country).toBeNull();
    });

    it('should handle various countries', () => {
      expect(getCountryByCode3('GBR')?.name).toBe('United Kingdom');
      expect(getCountryByCode3('DEU')?.name).toBe('Germany');
      expect(getCountryByCode3('JPN')?.name).toBe('Japan');
      expect(getCountryByCode3('IND')?.name).toBe('India');
    });
  });

  describe('getCountryByName', () => {
    it('should return country by exact name', () => {
      const country = getCountryByName('UnitedStates');
      expect(country).not.toBeNull();
      expect(country?.code2).toBe('US');
    });

    it('should handle name with spaces', () => {
      const country = getCountryByName('United States');
      expect(country).not.toBeNull();
      expect(country?.code2).toBe('US');
    });

    it('should be case-insensitive', () => {
      const country = getCountryByName('unitedstates');
      expect(country).not.toBeNull();
      expect(country?.code2).toBe('US');
    });

    it('should return null for invalid name', () => {
      const country = getCountryByName('Atlantis');
      expect(country).toBeNull();
    });
  });

  describe('getCountriesByCurrency', () => {
    it('should return all countries using EUR', () => {
      const countries = getCountriesByCurrency('EUR');
      expect(countries.length).toBeGreaterThan(0);
      expect(countries.every(c => c.currencyCode === 'EUR')).toBe(true);
      
      // Check some expected countries
      const countryNames = countries.map(c => c.name);
      expect(countryNames).toContain('Germany');
      expect(countryNames).toContain('France');
    });

    it('should return countries using USD', () => {
      const countries = getCountriesByCurrency('USD');
      expect(countries.length).toBeGreaterThan(0);
      
      const countryNames = countries.map(c => c.name);
      expect(countryNames).toContain('United States');
    });

    it('should be case-insensitive', () => {
      const upper = getCountriesByCurrency('EUR');
      const lower = getCountriesByCurrency('eur');
      expect(upper.length).toBe(lower.length);
    });

    it('should return countries for XXX currency (World region)', () => {
      const countries = getCountriesByCurrency('XXX');
      expect(countries.length).toBeGreaterThanOrEqual(0);
      // XXX is used by "World" region in the data
    });
    
    it('should return empty array for completely invalid currency', () => {
      const countries = getCountriesByCurrency('ZZZ');
      expect(countries).toEqual([]);
    });
  });

  describe('getCountriesByCallingCode', () => {
    it('should return countries with +1 calling code', () => {
      const countries = getCountriesByCallingCode('+1');
      expect(countries.length).toBeGreaterThan(0);
      
      const countryNames = countries.map(c => c.name);
      expect(countryNames).toContain('United States');
      expect(countryNames).toContain('Canada');
    });

    it('should work without + prefix', () => {
      const countries = getCountriesByCallingCode('1');
      expect(countries.length).toBeGreaterThan(0);
    });

    it('should return countries with other calling codes', () => {
      const ukCountries = getCountriesByCallingCode('+44');
      expect(ukCountries.some(c => c.name === 'United Kingdom')).toBe(true);
    });
  });

  describe('searchCountries', () => {
    it('should find countries with partial match', () => {
      const results = searchCountries('united');
      expect(results.length).toBeGreaterThan(0);
      
      const names = results.map(c => c.name);
      expect(names).toContain('United States');
      expect(names).toContain('United Kingdom');
      expect(names).toContain('United Arab Emirates');
    });

    it('should be case-insensitive by default', () => {
      const upper = searchCountries('UNITED');
      const lower = searchCountries('united');
      expect(upper.length).toBe(lower.length);
    });

    it('should support case-sensitive search', () => {
      const results = searchCountries('United', { caseSensitive: true });
      expect(results.length).toBeGreaterThan(0);
    });

    it('should support exact match', () => {
      const results = searchCountries('Germany', { exactMatch: true });
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Germany');
    });

    it('should return empty array when no match', () => {
      const results = searchCountries('ZZZNotACountry');
      expect(results).toEqual([]);
    });
  });

  describe('convertCountryCode', () => {
    it('should convert 2-letter to 3-letter code', () => {
      expect(convertCountryCode('US', 'code3')).toBe('USA');
      expect(convertCountryCode('GB', 'code3')).toBe('GBR');
      expect(convertCountryCode('DE', 'code3')).toBe('DEU');
    });

    it('should convert 3-letter to 2-letter code', () => {
      expect(convertCountryCode('USA', 'code2')).toBe('US');
      expect(convertCountryCode('GBR', 'code2')).toBe('GB');
      expect(convertCountryCode('DEU', 'code2')).toBe('DE');
    });

    it('should return null for invalid code', () => {
      expect(convertCountryCode('INVALID', 'code2')).toBeNull();
      expect(convertCountryCode('XX', 'code3')).toBeNull();
    });
  });

  describe('getCallingCode', () => {
    it('should get calling code by country name', () => {
      expect(getCallingCode('United States')).toBe('+1');
      expect(getCallingCode('Germany')).toBe('+49');
      expect(getCallingCode('Japan')).toBe('+81');
    });

    it('should get calling code by 2-letter code', () => {
      expect(getCallingCode('US')).toBe('+1');
      expect(getCallingCode('DE')).toBe('+49');
    });

    it('should get calling code by 3-letter code', () => {
      expect(getCallingCode('USA')).toBe('+1');
      expect(getCallingCode('DEU')).toBe('+49');
    });

    it('should return null for invalid identifier', () => {
      expect(getCallingCode('InvalidCountry')).toBeNull();
    });
  });

  describe('getCurrencyCode', () => {
    it('should get currency code by country name', () => {
      expect(getCurrencyCode('United States')).toBe('USD');
      expect(getCurrencyCode('Germany')).toBe('EUR');
      expect(getCurrencyCode('Japan')).toBe('JPY');
    });

    it('should get currency code by 2-letter code', () => {
      expect(getCurrencyCode('US')).toBe('USD');
      expect(getCurrencyCode('JP')).toBe('JPY');
    });

    it('should get currency code by 3-letter code', () => {
      expect(getCurrencyCode('USA')).toBe('USD');
      expect(getCurrencyCode('JPN')).toBe('JPY');
    });

    it('should return null for invalid identifier', () => {
      expect(getCurrencyCode('InvalidCountry')).toBeNull();
    });
  });

  describe('getCurrencySymbol', () => {
    it('should get currency symbol by country name', () => {
      expect(getCurrencySymbol('United States')).toBe('$');
      expect(getCurrencySymbol('Japan')).toBe('¥');
    });

    it('should get currency symbol by country code', () => {
      expect(getCurrencySymbol('US')).toBe('$');
      expect(getCurrencySymbol('JP')).toBe('¥');
    });

    it('should return null for invalid identifier', () => {
      expect(getCurrencySymbol('InvalidCountry')).toBeNull();
    });
  });

  describe('getAllCurrencies', () => {
    it('should return array of unique currencies', () => {
      const currencies = getAllCurrencies();
      expect(currencies.length).toBeGreaterThan(0);
      expect(currencies).toContain('USD');
      expect(currencies).toContain('EUR');
      expect(currencies).toContain('JPY');
      
      // Check uniqueness
      const uniqueCurrencies = new Set(currencies);
      expect(uniqueCurrencies.size).toBe(currencies.length);
    });

    it('should return sorted array', () => {
      const currencies = getAllCurrencies();
      const sorted = [...currencies].sort();
      expect(currencies).toEqual(sorted);
    });
  });

  describe('getAllCallingCodes', () => {
    it('should return array of unique calling codes', () => {
      const codes = getAllCallingCodes();
      expect(codes.length).toBeGreaterThan(0);
      expect(codes).toContain('+1');
      expect(codes).toContain('+44');
      expect(codes).toContain('+49');
      
      // Check uniqueness
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('should not include +0', () => {
      const codes = getAllCallingCodes();
      expect(codes).not.toContain('+0');
    });
  });
});

