import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [inputData, setInputData] = useState<string>('');
    const [displayData, setDisplayData] = useState<number[]>([]);

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    const onClickButton = async () => {
        setLoader(true);
        const number = Number(inputData);
        const displayArray: number[] = [];

        if (!Number.isNaN(number) && number > 0) {
            for (let i = 0; i <= number; i++) {
                if (i < 2) {
                    i === 0 ? displayArray.push(0) : displayArray.push(1);
                } else {
                    displayArray.push(displayArray[i - 2] + displayArray[i - 1])
                }

                setDisplayData([...displayArray]);
                setInputData("");
                
                await delay(500);
            }
        }
        
        setLoader(false);
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.main}>
                <Input
                    placeholder="Введите число"
                    type="number"
                    max={19}
                    min={1}
                    maxLength={19}
                    isLimitText={true}
                    value={inputData}
                    onChange={onChangeInput}
                />
                <Button
                    text="Развернуть"
                    onClick={onClickButton}
                    isLoader={loader}
                    disabled={!inputData || inputData === "" || Number(inputData) > 19 || Number(inputData) < 1}
                />
            </div>

            <div className={styles.review}>
                {displayData && displayData.map((element, index) => {
                    return (
                        <Circle letter={element.toString()} tail={index.toString()} key={index}/>
                    )
                })}
            </div>
        </SolutionLayout>
    );
};
