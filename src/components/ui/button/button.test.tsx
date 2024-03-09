import renderer from "react-test-renderer";
import {render, screen, fireEvent} from "@testing-library/react";
import {Button} from "./button";

describe('Тестирование компонента Button', function () {
    it('кнопка с текстом', () => {
        const element = renderer
            .create(<Button text="TEST"/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('кнопка без текста', () => {
        const element = renderer
            .create(<Button text=""/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('заблокированная кнопка', () => {
        const element = renderer
            .create(<Button text="TEST" disabled={true}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('кнопка с индикацией загрузки', () => {
        const element = renderer
            .create(<Button text="TEST" isLoader={true}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('проверка коллбека при клике', () => {
        const testCallback = jest.fn();
        render(<Button text="TEST" onClick={testCallback}/>);
        fireEvent.click(screen.getByText('TEST'));
        expect(testCallback).toHaveBeenCalled();
    });
});