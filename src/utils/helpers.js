export const findByAtrr = (component, testData) => {
    return component.find(`[data-test='${testData}']`);
}