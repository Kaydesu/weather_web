export const findByAtrr = (component, testData) => {
    return component.find(`[data-test='${testData}']`);
}

export const generateTimeData = (days) => {
    let output = [];
    for (let i = 0; i < days * 24; i++) {
        output.push(i);
    }
    output.push(output[output.length - 1] + 1);
    return output;
}

export const generateTideData = (days) => {
    let output = [];
    let min = 0.5;
    let max = 2;
    for (let i = 0; i < days * 24; i += 6) {
        output.push({
            time: i,
            waterLevel: Math.random() * (max - min) + min
        })
    }

    output.push({
        time: output[output.length - 1].time + 6,
        waterLevel: Math.random() * (max - min) + min
    })

    return output;
}

export const convertToDayNight = (hour) => {

    // Recursive to get period hour
    while (hour > 23) {
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

export const countDayByHour = (hour) => {
    return Math.floor(hour / 24) + 1;
}

export const formatTime = (time) => {
    const fmTime = time % 24;
    const decimal = fmTime % 1;
    const hr = Math.floor(fmTime);
    const min = Math.floor(60 * decimal);
    if (hr > 12) {
        return `${hr - 12}:${min >= 10 ? "" : "0"}${min} pm`;
    } else if (hr === 0) {
        return `${12}:${min >= 10 ? "" : "0"}${min} pm`;
    }
    return `${hr}:${min >= 10 ? "" : "0"}${min} am`;
}

export const scale = (val, src, dst) => {
    if (val > src[1] || val < src[0]) {
        return null;
    }
    return ((val - src[0]) / (src[1] - src[0])) * (dst[1] - dst[0]) + dst[0]
}