import {ElementStates} from "../types/element-states";
import {DELAY_LONG} from "../constants/delays";

import type {DisplayArray} from "../types/display-array";

export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function swapArray<T extends string | number>(arr: DisplayArray<T>, first: number, second: number) {
    const temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;

    return arr;
}

export const reverse = async (inputData: string, setDisplayData: (displayData: DisplayArray<string>) => void) => {
    let index: number | undefined;
    let swapElement: number;
    let tempArr: DisplayArray<string> = [];

    if (inputData.length % 2) {
        index = inputData.length / 2 - 0.5
    }

    for (let i = 0; i < inputData.length; i++) {
        tempArr[i] = {
            value: inputData[i],
            color: index && i === index ? ElementStates.Default : ElementStates.Changing
        }
    }

    setDisplayData(tempArr);

    for (let i = 0; i < inputData.length / 2; i++) {
        swapElement = inputData.length - i - 1;
        tempArr[i].color = ElementStates.Modified;
        tempArr[swapElement].color = ElementStates.Modified;

        await delay(DELAY_LONG);
        setDisplayData([...tempArr]);

        await delay(DELAY_LONG);
        tempArr = swapArray(tempArr, i, swapElement);
        setDisplayData([...tempArr]);
    }

    return tempArr;
};