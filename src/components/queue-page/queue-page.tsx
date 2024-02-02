import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";

import styles from "./queue-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import QueueArr from "./queue";
import {DELAY_LONG, DELAY_SHORT, delay} from "../../utils/utils";

export const QueuePage: React.FC = () => {
    const [queue,] = useState(() => new QueueArr<string>());
    const [head, setHead] = useState<number | null>(null);
    const [tail, setTail] = useState<number | null>(null);
    const [inputData, setInputData] = useState<string>('');
    const [displayData, setDisplayData] = useState<string[]>([]);
    const [loader, setLoader] = useState<"add" | "del" | "clear" | null>(null);
    const [itemShow, setItemShow] = useState<number | null>(null);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    useEffect(() => {
        setDisplayData([...queue.getItem()]);
    }, []);

    const onClickAdd = async () => {
        if (inputData && inputData !== "" && head !== displayData.length - 1 && tail !== displayData.length - 1) {
            setLoader("add");
            tail !== null ? setItemShow(tail + 1) : setItemShow(0);
            queue.enqueue(inputData);
            setHead(queue.getHead);
            setTail(queue.getTail);
            setDisplayData([...queue.getItem()]);
            setInputData('');
            await delay(DELAY_SHORT);
            setItemShow(null);
            setLoader(null);
        }
    }

    const onClickDel = async () => {
        setLoader("del");
        setItemShow(head);
        await delay(DELAY_SHORT);
        setItemShow(null);
        queue.dequeue();
        setHead(queue.getHead);
        setTail(queue.getTail);
        setDisplayData([...queue.getItem()]);
        setLoader(null);
    }

    const onClickClear = async () => {
        setLoader("clear");
        queue.clear();
        setDisplayData([...queue.getItem()]);
        setHead(queue.getHead);
        setTail(queue.getTail);
        await delay(DELAY_SHORT);
        setLoader(null);
    }

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.main}>
                <div className={styles.buttons}>
                    <Input maxLength={4}
                           isLimitText={true}
                           value={inputData}
                           onChange={onChangeInput}/>
                    <Button
                        text="Добавить"
                        onClick={onClickAdd}
                        isLoader={loader === "add"}
                        disabled={!inputData || inputData === ""}
                    />
                    <Button
                        text="Удалить"
                        onClick={onClickDel}
                        isLoader={loader === "del"}
                        disabled={head === null || tail === null}
                    />
                </div>
                <Button text="Очистить"
                        onClick={onClickClear}
                        isLoader={loader === "clear"}
                        disabled={head === null}
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
                            head={index === head ? "head" : ""}
                            tail={index === tail ? "tail" : ""}
                        />
                    )
                })}
            </div>
        </SolutionLayout>
    );
};
