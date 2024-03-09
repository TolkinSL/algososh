import {ElementStates} from "../types/element-states";
import {DELAY_LONG} from "../constants/delays";

import type {DisplayArray} from "../types/display-array";
import {Direction} from "../types/direction";

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

export const sortSelect = async (type: Direction,
                                 displayData: DisplayArray<number>,
                                 setDisplayData: (displayData: DisplayArray<number>) => void,
                                 setFirstItem: (number: number | null) => void,
                                 setSecondItem: (number: number | null) => void) => {
    let tempArray = displayData;
    let minIndex: number;

    for (let i = 0; i < tempArray.length; i++) {
        setFirstItem(i);
        minIndex = i;
        await delay(DELAY_LONG);

        for (let j = i + 1; j < tempArray.length; j++) {
            setSecondItem(j);

            if (type === Direction.Ascending) {
                minIndex = tempArray[minIndex].value < tempArray[j].value ? minIndex : j;
            }

            if (type === Direction.Descending) {
                minIndex = tempArray[minIndex].value > tempArray[j].value ? minIndex : j;
            }

            await delay(DELAY_LONG);
        }

        if (minIndex === i) {
            tempArray[i].color = ElementStates.Modified;
        } else {
            tempArray = swapArray(tempArray, i, minIndex);
            tempArray[i].color = ElementStates.Modified;
        }

        setDisplayData([...tempArray]);
        await delay(DELAY_LONG);
    }

    setFirstItem(null);
    setSecondItem(null);

    return tempArray;
};

export const sortBubble = async (type: Direction,
                          displayData: DisplayArray<number>,
                          setDisplayData: (displayData: DisplayArray<number>) => void,
                          setFirstItem: (number: number | null) => void,
                          setSecondItem: (number: number | null) => void) => {
    let tempArray = displayData;

    for (let i = 0; i < tempArray.length; i++) {
        for (let j = 0; j < tempArray.length - 1 - i; j++) {
            setFirstItem(j);
            setSecondItem(j + 1)
            if (type === Direction.Ascending) {
                if (tempArray[j].value > tempArray[j + 1].value) {
                    tempArray = swapArray(tempArray, j, j + 1);
                }
            }
            if (type === Direction.Descending) {
                if (tempArray[j].value < tempArray[j + 1].value) {
                    tempArray = swapArray(tempArray, j, j + 1);
                }
            }
            setDisplayData([...tempArray]);
            await delay(DELAY_LONG);
        }
        tempArray[tempArray.length - 1 - i].color = ElementStates.Modified;
        setDisplayData([...tempArray]);
    }

    setFirstItem(null);
    setSecondItem(null);

    return tempArray;
};