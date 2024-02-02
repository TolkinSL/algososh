import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./list-page.module.css";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import DoubleLinkedList from "./list";
import {delay} from "../../utils/utils";
import {DELAY_LONG, DELAY_SHORT} from "../../constants/delays";

type ChangedElement = {
    index: number | null;
    value: string | null;
    byIndex: boolean;
}

type DisplayArray<T> = DisplayArrayElement<T> [];
type DisplayArrayElement<T> = { value: T; color: ElementStates; };

export const ListPage: React.FC = () => {
    const changedElementDefaultValue: ChangedElement = {index: null, value: null, byIndex: false};
    const [list, ] = useState(() => new DoubleLinkedList<DisplayArrayElement<string>>(randomArr(6)))
    const [inputValue, setInputValue] = useState<string>('');
    const [inputIndex, setInputIndex] = useState<string>('');
    const [displayData, setDisplayData] =  useState<DisplayArray<string>>([]);
    const [elementToAdd, setElementToAdd] = useState<ChangedElement>(changedElementDefaultValue);
    const [elementToDel, setElementToDel] = useState<ChangedElement>(changedElementDefaultValue);
    const [elementChanged, setElementChanged] = useState<number | null>(null);
    const [maxIndex, setMaxIndex] = useState<number>(0);
    const [loader, setLoader] = useState<string | null>(null);

    useEffect(() => {
        updateOutput();
    }, []);

    function random(min: number, max: number) {
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    function randomArr(max: number = 17) {
        const arraySize = random(3, max);
        const resultArray: DisplayArray<string> = [];

        for (let i = 0; i < arraySize; i++) {
            resultArray.push({value: random(0, 100).toString(), color: ElementStates.Default});
        }
        return resultArray;
    }

    const delArrayElementValue = (index: number, array: DisplayArray<string>) => {
        const tempArray = array;
        tempArray[index].value = "";
        return tempArray;
    }
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIndex(e.target.value)
    }
    const addToHead = async () => {
        if (inputValue && inputValue !== "") {
            setLoader("addHead");
            list.addToStart({value: inputValue, color: ElementStates.Default});
            setElementToAdd({index: 0, value: inputValue, byIndex: false});
            await delay(DELAY_SHORT);
            updateOutput();
            setElementChanged(0);
            setElementToAdd(changedElementDefaultValue);
            setInputValue("");
            await delay(DELAY_SHORT);
            setElementChanged(null);
            setLoader(null);
        }
    }
    const addToTail = async () => {
        if (inputValue && inputValue !== "") {
            setLoader("addTail");
            list.addToEnd({value: inputValue, color: ElementStates.Default});
            setElementToAdd({index: displayData.length - 1, value: inputValue, byIndex: false});
            await delay(DELAY_SHORT);
            updateOutput();
            setElementChanged(displayData.length);
            setElementToAdd(changedElementDefaultValue);
            setInputValue("");
            await delay(DELAY_SHORT);
            setElementChanged(null);
            setLoader(null);
        }
    }
    const addByIndex = async() => {
        if (inputValue && inputValue !== "" && inputIndex && inputIndex !== "") {
            setLoader("addByIndex");
            list.addByIndex({value: inputValue, color: ElementStates.Default}, Number(inputIndex));
            for ( let i = 0; i <= Number(inputIndex); i++) {
                setElementToAdd({index: i, value: inputValue, byIndex: true});
                await delay(DELAY_SHORT);
            }
            updateOutput();
            setElementChanged(Number(inputIndex));
            setElementToAdd(changedElementDefaultValue);
            setInputValue("");
            setInputIndex("");
            await delay(DELAY_SHORT);
            setElementChanged(null);
            setLoader(null);
        }
    }
    const delFromHead = async () => {
        setLoader("delHead");
        list.delFromStart();
        setElementToDel({index: 0, value: displayData[0].value, byIndex: false});
        setDisplayData([...delArrayElementValue(0, displayData)]);
        await delay(DELAY_SHORT);
        updateOutput();
        setElementToDel(changedElementDefaultValue);
        await delay(DELAY_SHORT);
        setLoader(null);
    }
    const delFromTail = async () => {
        setLoader("delTail");
        list.delFromEnd();
        setElementToDel({index: displayData.length -1, value: displayData[displayData.length -1].value, byIndex: false});
        setDisplayData([...delArrayElementValue(displayData.length -1, displayData)]);
        await delay(DELAY_SHORT);
        updateOutput();
        setElementToDel(changedElementDefaultValue);
        setLoader(null);
    }
    const delByIndex = async () => {
        if ( inputIndex && inputIndex !== "" && Number(inputIndex) <= maxIndex) {
            setLoader("delByIndex");
            list.delByIndex(Number(inputIndex));
            for ( let i = 0; i < Number(inputIndex); i++) {
                setElementToDel({index: i, value: null, byIndex: true});
                await delay(DELAY_SHORT);
            }

            setElementToDel({index: Number(inputIndex), value: displayData[Number(inputIndex)].value, byIndex: true});
            setDisplayData([...delArrayElementValue(Number(inputIndex), displayData)]);
            setInputIndex("");
            await delay(DELAY_SHORT);
            updateOutput();
            setElementToDel(changedElementDefaultValue);
            setLoader(null);
        }
    }
    const updateOutput = () => {
        const tempArray = list.getAsArray();
        if (tempArray) {
            setDisplayData([...tempArray]);
            setMaxIndex(tempArray.length -1);
        }
    }

    return (
        <SolutionLayout title="Связный список">
            <div className={styles.main}>
                <Input
                    placeholder="Введите значение"
                    maxLength={4}
                    isLimitText={true}
                    value={inputValue}
                    disabled={loader != null}
                    onChange={onChangeValue}
                />
                <Button
                    text="Добавить в head"
                    linkedList="small"
                    disabled={(loader !== "addHead" && loader !== null) || inputValue === ""}
                    isLoader={loader === "addHead"}
                    onClick={addToHead}
                />
                <Button
                    text="Добавить в tail"
                    linkedList="small"
                    disabled={(loader !== "addTail" && loader !== null) || inputValue === ""}
                    isLoader={loader === "addTail"}
                    onClick={addToTail}
                />
                <Button
                    text="Удалить из head"
                    linkedList="small"
                    disabled={loader !== "delHead" && loader !== null}
                    isLoader={loader === "delHead"}
                    onClick={delFromHead}
                />
                <Button
                    text="Удалить из tail"
                    linkedList="small"
                    disabled={loader !== "delTail" && loader !== null}
                    isLoader={loader === "delTail"}
                    onClick={delFromTail}
                />
            </div>
            <div className={styles.main}>
                <Input
                    placeholder="Введите индекс"
                    value={inputIndex}
                    max={maxIndex}
                    isLimitText={true}
                    type="number"
                    disabled={loader != null}
                    onChange={onChangeIndex}
                />
                <div className={styles.buttons}>
                    <Button
                        text="Добавить по индексу"
                        linkedList="big"
                        disabled={(loader !== "addByIndex" && loader !== null) || inputValue === "" || inputIndex === "" ||
                            Number(inputIndex) > maxIndex || Number(inputIndex) < 0}
                        isLoader={loader === "addByIndex"}
                        onClick={addByIndex}
                    />
                    <Button
                        text="Удалить по индексу"
                        linkedList="big"
                        disabled={(loader !== "delByIndex" && loader !== null) || inputIndex === "" || Number(inputIndex) > maxIndex
                            || Number(inputIndex) < 0}
                        isLoader={loader === "delByIndex"}
                        onClick={delByIndex}
                    />
                </div>
            </div>

            <div className={styles.review}>
                {displayData && displayData.map((element, index) => {
                    return (
                        <div className={styles.element} key={index}>
                            <Circle
                                state={
                                    elementChanged === index ? ElementStates.Modified :
                                        elementToAdd.byIndex && elementToAdd.index !== null && elementToAdd.index > index ?
                                            ElementStates.Changing :
                                            elementToDel.byIndex && elementToDel.index !== null && elementToDel.index > index ?
                                                ElementStates.Changing : ElementStates.Default
                                }
                                letter={element.value.toString()}
                                index={index}
                                head={
                                    elementToAdd.index === index ?
                                        <Circle letter={elementToAdd.value?.toString()} state={ElementStates.Changing}
                                                isSmall={true}/> :
                                        index === 0 ? "head" : ""
                                }
                                tail={
                                    elementToDel.index === index && elementToDel.value != null ?
                                        <Circle letter={elementToDel.value?.toString()} state={ElementStates.Changing}
                                                isSmall={true}/> :
                                        index === displayData.length - 1 ? "tail" : ""
                                }
                            />
                            {index < displayData.length - 1 && <ArrowIcon/>}
                        </div>
                    )
                })}
            </div>
        </SolutionLayout>
    );
};
