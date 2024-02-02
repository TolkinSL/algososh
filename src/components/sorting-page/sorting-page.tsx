import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {DELAY_LONG, DELAY_SHORT, delay} from "../../utils/utils";

type DisplayArray<T> = DisplayArrayElement<T> [];
type DisplayArrayElement<T> = { value: T; color: ElementStates; };

export const SortingPage: React.FC = () => {
    const [sortType, setSortType] = useState<"select" | "bubble">("select");
    const [displayData, setDisplayData] = useState<DisplayArray<number>>([]);
    const [loader, setLoader] = useState<"Ascending" | "Descending" | null>(null);
    const [firstItem, setFirstItem] = useState<number | null>();
    const [secondItem, setSecondItem] = useState<number | null>();

    function swapArray<T extends string | number>(arr: DisplayArray<T>, first: number, second: number) {
        const temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;

        return arr;
    }

    function random(min: number, max: number) {
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    function randomArr(max: number = 17) {
        const arraySize = random(3, max);
        const resultArray: DisplayArray<number> = [];

        for (let i = 0; i < arraySize; i++) {
            resultArray.push({value: random(0, 100), color: ElementStates.Default});
        }
        return resultArray;
    }

    const handleAscending = () => {
        setLoader("Ascending");
        sortType === "select" ? sortSelect(Direction.Ascending) : sortBubble(Direction.Ascending);
    }
    const handleDescending = () => {
        setLoader("Descending");
        sortType === "select" ? sortSelect(Direction.Descending) : sortBubble(Direction.Descending);
    }
    const handleCreateArray = () => {
        setDisplayData(randomArr());
    }
    const sortSelect = async (type: Direction) => {
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
        setLoader(null);
    }

    const sortBubble = async (type: Direction) => {
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
        setLoader(null);
    }

    useEffect(() => {
        setDisplayData(randomArr());
    }, []);

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.main}>
                <div className={styles.radio}>
                    <RadioInput label="Выбор" name="sortType" value="select" checked={sortType === "select"}
                                onChange={() => {
                                    setSortType("select")
                                }}/>
                    <RadioInput label="Пузырек" name="sortType" value="bubble" checked={sortType === "bubble"}
                                onChange={() => {
                                    setSortType("bubble")
                                }}/>
                </div>
                <div className={styles.buttons}>
                    <Button text="По возрастанию"
                            sorting={Direction.Ascending}
                            isLoader={loader === "Ascending"}
                            onClick={handleAscending}
                            disabled={loader === "Descending"}
                    />
                    <Button text="По убыванию"
                            sorting={Direction.Descending}
                            isLoader={loader === "Descending"}
                            onClick={handleDescending}
                            disabled={loader === "Ascending"}
                    />
                </div>
                <Button text="Новый массив"
                        onClick={handleCreateArray}
                        disabled={loader !== null}
                />
            </div>

            <div className={styles.review}>
                {displayData && displayData.map((element, index) => {
                    return (
                        <Column
                            index={Number(element.value)}
                            state={firstItem === index || secondItem === index ? ElementStates.Changing : element.color}
                            key={index}
                        />
                    )
                })}
            </div>
        </SolutionLayout>
    );
};
