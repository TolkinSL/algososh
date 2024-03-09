import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./string.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/utils";
import {DELAY_LONG, DELAY_SHORT} from "../../constants/delays";

import type {DisplayArray} from "../../types/display-array";
// type DisplayArray<T> = DisplayArrayElement<T> [];
// type DisplayArrayElement<T> = { value: T; color: ElementStates; };
import {reverse} from "../../utils/utils";

export const StringComponent: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [inputData, setInputData] = useState<string>('');
    const [displayData, setDisplayData] = useState<DisplayArray<string>>([]);

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
        await reverse(inputData, setDisplayData);
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
