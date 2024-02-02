export const DELAY_LONG = 1000;
export const DELAY_SHORT = 500;
export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}