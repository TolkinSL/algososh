import {ElementStates} from "./element-states";

export type DisplayArray<T> = DisplayArrayElement<T> [];
export type DisplayArrayElement<T> = { value: T; color: ElementStates; };