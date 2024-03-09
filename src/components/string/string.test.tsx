import {reverse} from "../../utils/utils";

jest.setTimeout(10000);

describe.each([
    ['с чётным количеством символов', 'work', 'krow'],
    ['с нечетным количеством символов', 'hello', 'olleh'],
    ['с одним символом', 'h', 'h'],
    ['пустую строку', '', ''],
])('Тестирование алгоритма разворота строки', (name, input, expected) => {
    it(name, async () => {
        let output = '';
        const tempArr = await reverse(input, (fake) => {
        });
        tempArr.forEach(element => {
            output = output + element.value;
        });
        expect(output).toBe(expected);
    });
});
