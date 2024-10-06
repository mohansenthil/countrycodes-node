import { TwoLetterISORegionCode } from "../src/twoLetterISORegionCode";


describe('TwoLetterISORegionCode', () => {
    it('should have the correct TwoLetterISORegionCode code for Afghanistan', () => {
        expect(TwoLetterISORegionCode.Afghanistan).toBe('AF');
    });

    it('should have the correct TwoLetterISORegionCode code for UnitedStates', () => {
        expect(TwoLetterISORegionCode.UnitedStates).toBe('US');
    });

    it('should have the correct TwoLetterISORegionCode code for UnitedKingdom', () => {
        expect(TwoLetterISORegionCode.UnitedKingdom).toBe('GB');
    });

    it('should have the correct TwoLetterISORegionCode code for India', () => {
        expect(TwoLetterISORegionCode.India).toBe('IN');
    });
});
