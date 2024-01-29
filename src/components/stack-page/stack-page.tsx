import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./stack-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import StackArr from "./stack";

export const StackPage: React.FC = () => {
    const [stack,] = useState(() => new StackArr<string>());
    const [inputData, setInputData] = useState<string>('');
    const [displayData, setDisplayData] = useState<string[]>([]);
    const [loader, setLoader] = useState<"add" | "del" | "clear" | null>(null);
    const [itemShow, setItemShow] = useState<number | null>(null);

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }
    const clickAdd = async () => {
        if (inputData && inputData !== "") {
            setLoader("add");
            setItemShow(displayData.length);
            stack.push(inputData);
            setDisplayData([...stack.getItem()]);
            setInputData('');
            await delay(500);
            setItemShow(null);
            setLoader(null);
        }
    }
    const clickDel = async () => {
        if (displayData.length > 0) {
            setLoader("del");
            setItemShow(displayData.length - 1);
            await delay(500);
            setItemShow(null);
            stack.pop();
            setDisplayData([...stack.getItem()]);
            setLoader(null);
        }
    }
    const clickClear = async () => {
        setLoader("clear");
        stack.clear();
        setDisplayData([]);
        await delay(500);
        setLoader(null);
    }

    return (
        <SolutionLayout title="Стек">
            <div className={styles.main}>
                <div className={styles.buttons}>
                    <Input maxLength={4}
                           isLimitText={true}
                           value={inputData}
                           onChange={changeInput}
                    />
                    <Button text="Добавить"
                            isLoader={loader === "add"}
                            onClick={clickAdd}
                            disabled={!inputData || inputData === ""}
                    />
                    <Button text="Удалить"
                            isLoader={loader === "del"}
                            onClick={clickDel}
                            disabled={displayData.length === 0}
                    />
                </div>
                <Button text="Очистить"
                        isLoader={loader === "clear"}
                        onClick={clickClear}
                        disabled={displayData.length === 0}
                />
            </div>

            <div className={styles.review}>
                {displayData && displayData.map((element, index) => {
                    return (
                        <Circle
                            state={itemShow === index ? ElementStates.Changing : ElementStates.Default}
                            letter={element}
                            key={index}
                            index={index}
                            head={index === displayData.length - 1 ? "top" : ""}
                        />
                    )
                })}
            </div>

        </SolutionLayout>
    );
};
