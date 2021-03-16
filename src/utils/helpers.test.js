import { generateTimeData } from './helpers';

describe("Generate time data", () => {
    it("Should have length of 8", () => {
        expect(generateTimeData(1).length).toBe(8);
    });
});