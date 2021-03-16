export const findByAtrr = (component, testData) => {
    return component.find(`[data-test='${testData}']`);
}

export const generateTimeData = (days) => {
    let samples = [0, 3, 6, 9, 12, 15, 18, 23];
    let output = [];

    for(let i = 0; i < days; i ++) {
        output = output.concat(samples);
    }

    return output;
}