import { CountryData, getAllCountries, getAllCountryNames } from '../src/countryData';

describe('CountryData', () => {
  describe('CountryData object', () => {
    it('should contain country data', () => {
      expect(CountryData.UnitedStates).toBeDefined();
      expect(CountryData.Germany).toBeDefined();
      expect(CountryData.Japan).toBeDefined();
    });

    it('should have complete data for each country', () => {
      const us = CountryData.UnitedStates;
      expect(us.name).toBe('United States');
      expect(us.code2).toBe('US');
      expect(us.code3).toBe('USA');
      expect(us.callingCode).toBe('+1');
      expect(us.currencyCode).toBe('USD');
      expect(us.currencySymbol).toBe('$');
    });

    it('should have data for major countries', () => {
      // Test a variety of countries
      expect(CountryData.China.code2).toBe('CN');
      expect(CountryData.India.code2).toBe('IN');
      expect(CountryData.Brazil.code2).toBe('BR');
      expect(CountryData.Russia.code2).toBe('RU');
      expect(CountryData.Australia.code2).toBe('AU');
      expect(CountryData.Canada.code2).toBe('CA');
      expect(CountryData.France.code2).toBe('FR');
      expect(CountryData.UnitedKingdom.code2).toBe('GB');
    });

    it('should have proper currency data', () => {
      expect(CountryData.Japan.currencyCode).toBe('JPY');
      expect(CountryData.Japan.currencySymbol).toBe('¥');
      
      expect(CountryData.UnitedKingdom.currencyCode).toBe('GBP');
      expect(CountryData.UnitedKingdom.currencySymbol).toBe('£');
      
      expect(CountryData.Germany.currencyCode).toBe('EUR');
      expect(CountryData.Germany.currencySymbol).toBe('€');
    });

    it('should have proper calling codes', () => {
      expect(CountryData.UnitedStates.callingCode).toBe('+1');
      expect(CountryData.UnitedKingdom.callingCode).toBe('+44');
      expect(CountryData.Germany.callingCode).toBe('+49');
      expect(CountryData.Japan.callingCode).toBe('+81');
      expect(CountryData.India.callingCode).toBe('+91');
    });
  });

  describe('getAllCountries', () => {
    it('should return an array of all countries', () => {
      const countries = getAllCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(200);
    });

    it('should have country objects with all required fields', () => {
      const countries = getAllCountries();
      
      countries.forEach(country => {
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('code2');
        expect(country).toHaveProperty('code3');
        expect(country).toHaveProperty('callingCode');
        expect(country).toHaveProperty('currencyCode');
        expect(country).toHaveProperty('currencySymbol');
      });
    });

    it('should include major countries', () => {
      const countries = getAllCountries();
      const countryNames = countries.map(c => c.name);
      
      expect(countryNames).toContain('United States');
      expect(countryNames).toContain('China');
      expect(countryNames).toContain('India');
      expect(countryNames).toContain('Germany');
      expect(countryNames).toContain('Japan');
    });
  });

  describe('getAllCountryNames', () => {
    it('should return an array of country names', () => {
      const names = getAllCountryNames();
      expect(Array.isArray(names)).toBe(true);
      expect(names.length).toBeGreaterThan(200);
    });

    it('should contain expected country names', () => {
      const names = getAllCountryNames();
      expect(names).toContain('UnitedStates');
      expect(names).toContain('Germany');
      expect(names).toContain('Japan');
      expect(names).toContain('India');
      expect(names).toContain('Brazil');
    });

    it('should have all names as strings', () => {
      const names = getAllCountryNames();
      names.forEach(name => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      });
    });
  });
});

