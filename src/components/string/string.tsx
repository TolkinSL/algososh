import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./string.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";

export type DisplayArray<T> = DisplayArrayElement<T> [];
export type DisplayArrayElement<T> = { value: T; color: ElementStates; };

export const StringComponent: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [inputData, setInputData] = useState<string>('');
    const [displayData, setDisplayData] = useState<DisplayArray<string>>([]);

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    }

    function swapArray<T extends string | number>(arr: DisplayArray<T>, first: number, second: number) {
        const temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;

        return arr;
    }

    const clickButton = async () => {
        setLoader(true);

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

            await delay(1000);
            setDisplayData([...tempArr]);

            await delay(1000);
            tempArr = swapArray(tempArr, i, swapElement);
            setDisplayData([...tempArr]);
        }

        setLoader(false);
        setInputData("");
    }

    return (
        <SolutionLayout title="Строка">
            <div className={styles.main}>
                <Input maxLength={11}
                       isLimitText={true}
                       value={inputData}
                       onChange={changeInput}
                />
                <Button text="Развернуть"
                        onClick={clickButton}
                        isLoader={loader}
                        disabled={!inputData || inputData.length < 1}
                />
            </div>

            <div className={styles.review}>
                {displayData && displayData.map((element, index) => {
                    return (
                        <Circle state={element.color} letter={element.value} key={index}/>
                    )
                })}
            </div>

        </SolutionLayout>
    );
};
