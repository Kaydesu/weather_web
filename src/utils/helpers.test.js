import { convertToDayNight, countDayByHour, formatTime, generateTimeData, getPlottedDayTime, scale } from './helpers';

describe("Generate time data", () => {
    it("Should return array length of 8", () => {
        expect(generateTimeData(1).length).toBe(25);
    });
});

describe("Get day time value for plotting", () => {
    it("Should return 0 with input from range: 18, 19, ... 0, 1, ..6", () => {
        expect(getPlottedDayTime(18)).toBeCloseTo(0);
        expect(getPlottedDayTime(0)).toBeCloseTo(0);
        expect(getPlottedDayTime(6)).toBeCloseTo(0);
    });

    it("Should return value with input: 6, 7, 8, .... 18", () => {
        expect(getPlottedDayTime(9)).toBeCloseTo(Math.sin(Math.PI / 4));
        expect(getPlottedDayTime(12)).toBeCloseTo(Math.sin(Math.PI / 2));
        expect(getPlottedDayTime(15)).toBeCloseTo(Math.sin(3 * Math.PI / 4));
    })
});

describe("Convert to day or night", () => {
    it("Night time should be 1", () => {
        expect(convertToDayNight(0)).toBe(1);
        expect(convertToDayNight(2)).toBe(1);
        expect(convertToDayNight(5)).toBe(1);
        expect(convertToDayNight(24)).toBe(1);
    });
    it("Day time should be 0", () => {
        expect(convertToDayNight(6)).toBe(0);
        expect(convertToDayNight(12)).toBe(0);
        expect(convertToDayNight(15)).toBe(0);
        expect(convertToDayNight(31)).toBe(0);
    });
})

describe("Scale the range of a value to another range", () => {
    expect(scale(1, [0, 2], [0, 4])).toBe(2);
    expect(scale(0, [0, 2], [1, 4])).toBe(1);
    expect(scale(2, [0, 2], [0, 4])).toBe(4);
    expect(scale(-2, [1, 5], [0, 10])).toBeNull();
});

describe("Count day by number of hours", () => {
    expect(countDayByHour(6)).toBe(1);
    expect(countDayByHour(25)).toBe(2);
    expect(countDayByHour(45)).toBe(2);
});

describe("Convert floating point to time format", () => {
    expect(formatTime(9.5)).toBe("9:30 am");
    expect(formatTime(24.5)).toBe("12:30 pm");
    expect(formatTime(26.25)).toBe("2:15 am");
});