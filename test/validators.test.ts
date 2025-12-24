import {
  isValidCountryCode2,
  isValidCountryCode3,
  isValidCountryCode,
  isValidCountryName,
  isValidCurrencyCode,
  isValidCallingCode,
  validatePhoneNumber,
  parsePhoneNumber
} from '../src/validators';

describe('Validators', () => {
  describe('isValidCountryCode2', () => {
    it('should validate correct 2-letter codes', () => {
      expect(isValidCountryCode2('US')).toBe(true);
      expect(isValidCountryCode2('GB')).toBe(true);
      expect(isValidCountryCode2('DE')).toBe(true);
      expect(isValidCountryCode2('JP')).toBe(true);
      expect(isValidCountryCode2('CN')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidCountryCode2('us')).toBe(true);
      expect(isValidCountryCode2('Us')).toBe(true);
      expect(isValidCountryCode2('uS')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidCountryCode2('XX')).toBe(false);
      expect(isValidCountryCode2('ZZ')).toBe(false);
      expect(isValidCountryCode2('AA')).toBe(false);
    });

    it('should reject wrong length codes', () => {
      expect(isValidCountryCode2('USA')).toBe(false);
      expect(isValidCountryCode2('U')).toBe(false);
      expect(isValidCountryCode2('')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCountryCode2(null as any)).toBe(false);
      expect(isValidCountryCode2(undefined as any)).toBe(false);
      expect(isValidCountryCode2(123 as any)).toBe(false);
    });
  });

  describe('isValidCountryCode3', () => {
    it('should validate correct 3-letter codes', () => {
      expect(isValidCountryCode3('USA')).toBe(true);
      expect(isValidCountryCode3('GBR')).toBe(true);
      expect(isValidCountryCode3('DEU')).toBe(true);
      expect(isValidCountryCode3('JPN')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidCountryCode3('usa')).toBe(true);
      expect(isValidCountryCode3('Usa')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidCountryCode3('XXX')).toBe(false);
      expect(isValidCountryCode3('ZZZ')).toBe(false);
    });

    it('should reject wrong length codes', () => {
      expect(isValidCountryCode3('US')).toBe(false);
      expect(isValidCountryCode3('USAA')).toBe(false);
      expect(isValidCountryCode3('')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCountryCode3(null as any)).toBe(false);
      expect(isValidCountryCode3(undefined as any)).toBe(false);
    });
  });

  describe('isValidCountryCode', () => {
    it('should validate both 2-letter and 3-letter codes', () => {
      expect(isValidCountryCode('US')).toBe(true);
      expect(isValidCountryCode('USA')).toBe(true);
      expect(isValidCountryCode('GB')).toBe(true);
      expect(isValidCountryCode('GBR')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(isValidCountryCode('X')).toBe(false);
      expect(isValidCountryCode('XXXX')).toBe(false);
      expect(isValidCountryCode('ZZ')).toBe(false);
      expect(isValidCountryCode('ZZZ')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCountryCode('')).toBe(false);
      expect(isValidCountryCode(null as any)).toBe(false);
    });
  });

  describe('isValidCountryName', () => {
    it('should validate correct country names', () => {
      expect(isValidCountryName('UnitedStates')).toBe(true);
      expect(isValidCountryName('Germany')).toBe(true);
      expect(isValidCountryName('Japan')).toBe(true);
    });

    it('should handle names with spaces', () => {
      expect(isValidCountryName('United States')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidCountryName('unitedstates')).toBe(true);
      expect(isValidCountryName('GERMANY')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(isValidCountryName('Atlantis')).toBe(false);
      expect(isValidCountryName('FakeCountry')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCountryName('')).toBe(false);
      expect(isValidCountryName(null as any)).toBe(false);
    });
  });

  describe('isValidCurrencyCode', () => {
    it('should validate correct currency codes', () => {
      expect(isValidCurrencyCode('USD')).toBe(true);
      expect(isValidCurrencyCode('EUR')).toBe(true);
      expect(isValidCurrencyCode('JPY')).toBe(true);
      expect(isValidCurrencyCode('GBP')).toBe(true);
    });

    it('should be case-insensitive', () => {
      expect(isValidCurrencyCode('usd')).toBe(true);
      expect(isValidCurrencyCode('Usd')).toBe(true);
    });

    it('should reject currencies not used by any country', () => {
      expect(isValidCurrencyCode('ZZZ')).toBe(false);
    });

    it('should reject wrong length codes', () => {
      expect(isValidCurrencyCode('US')).toBe(false);
      expect(isValidCurrencyCode('USDD')).toBe(false);
      expect(isValidCurrencyCode('')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCurrencyCode(null as any)).toBe(false);
      expect(isValidCurrencyCode(undefined as any)).toBe(false);
    });
  });

  describe('isValidCallingCode', () => {
    it('should validate correct calling codes with +', () => {
      expect(isValidCallingCode('+1')).toBe(true);
      expect(isValidCallingCode('+44')).toBe(true);
      expect(isValidCallingCode('+49')).toBe(true);
      expect(isValidCallingCode('+81')).toBe(true);
    });

    it('should validate calling codes without +', () => {
      expect(isValidCallingCode('1')).toBe(true);
      expect(isValidCallingCode('44')).toBe(true);
      expect(isValidCallingCode('49')).toBe(true);
    });

    it('should reject invalid calling codes', () => {
      expect(isValidCallingCode('+999')).toBe(false);
      expect(isValidCallingCode('+9999')).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(isValidCallingCode('')).toBe(false);
      expect(isValidCallingCode(null as any)).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should validate US phone numbers', () => {
      const result = validatePhoneNumber('2025551234', 'US');
      expect(result.isValid).toBe(true);
      expect(result.countryCode).toBe('+1');
      expect(result.formatted).toBe('+1-2025551234');
    });

    it('should validate phone numbers with formatting', () => {
      const result = validatePhoneNumber('(202) 555-1234', 'US');
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('+1-2025551234');
    });

    it('should work with different country identifiers', () => {
      const byName = validatePhoneNumber('1234567890', 'Germany');
      const byCode2 = validatePhoneNumber('1234567890', 'DE');
      const byCode3 = validatePhoneNumber('1234567890', 'DEU');
      
      expect(byName.isValid).toBe(true);
      expect(byCode2.isValid).toBe(true);
      expect(byCode3.isValid).toBe(true);
      expect(byName.countryCode).toBe('+49');
      expect(byCode2.countryCode).toBe('+49');
      expect(byCode3.countryCode).toBe('+49');
    });

    it('should reject invalid country identifiers', () => {
      const result = validatePhoneNumber('1234567890', 'InvalidCountry');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid country identifier');
    });

    it('should reject too short phone numbers', () => {
      const result = validatePhoneNumber('123', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number length is invalid');
    });

    it('should reject too long phone numbers', () => {
      const result = validatePhoneNumber('12345678901234567890', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number length is invalid');
    });

    it('should reject empty phone numbers', () => {
      const result = validatePhoneNumber('', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number is required');
    });

    it('should reject phone numbers with no digits', () => {
      const result = validatePhoneNumber('abc-def-ghij', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number must contain digits');
    });
  });

  describe('parsePhoneNumber', () => {
    it('should parse phone number with calling code', () => {
      const result = parsePhoneNumber('+1-202-555-1234');
      expect(result.isValid).toBe(true);
      expect(result.countryCode).toBe('+1');
      expect(result.formatted).toBe('+12025551234');
    });

    it('should parse phone number without + prefix', () => {
      const result = parsePhoneNumber('1-202-555-1234');
      expect(result.isValid).toBe(true);
      expect(result.countryCode).toBe('+1');
    });

    it('should parse international phone numbers', () => {
      const ukResult = parsePhoneNumber('+44 20 7946 0958');
      expect(ukResult.isValid).toBe(true);
      expect(ukResult.countryCode).toBe('+44');
      
      const deResult = parsePhoneNumber('+49 30 12345678');
      expect(deResult.isValid).toBe(true);
      expect(deResult.countryCode).toBe('+49');
    });

    it('should reject phone numbers without calling code', () => {
      const result = parsePhoneNumber('2025551234');
      expect(result.isValid).toBe(false);
    });

    it('should reject invalid calling codes', () => {
      const result = parsePhoneNumber('+999-123-4567');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid calling code');
    });

    it('should reject empty input', () => {
      const result = parsePhoneNumber('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number is required');
    });
  });
});

