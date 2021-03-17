export const findByAtrr = (component, testData) => {
    return component.find(`[data-test='${testData}']`);
}

export const generateTimeData = (days) => {
    let output = [];
    for (let i = 0; i < days * 24; i++) {
        output.push(i);
    }
    return output;
}

export const generateTideData = (days) => {
    let output = [];

    for (let i = 0; i < days; i++) {
        for (let j = 0; j < 24; j++) {
            let min = 5;
            let max = 7;
            output.push(Math.random() * (max - min) + min);
        }
    }
    return output;
}

export const convertToDayNight = (hour) => {

    // Recursive to get period hour
    while(hour > 23) {
        hour = hour - 24;
    }

    let output;
    if (hour < 6) {
        output = 1;
    } else if (hour >= 6 && hour < 18) {
        output = 0;
    } else {
        output = 1;
    }
    return output;
}

export const getPlottedDayTime = (x) => {
    return Math.max(0, Math.sin((Math.PI / 12) * x - Math.PI / 2));
}

export const scale = (val, src, dst) => {
    if(val > src[1] || val < src[0]) {
        return null;
    }
    return ((val - src[0]) / (src[1] - src[0])) * (dst[1] - dst[0]) + dst[0]
}