import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Тестирование компонента Circle', () => {
    it('без буквы', function () {
        const element = renderer
            .create(<Circle letter=""/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с буквами', () => {
        const element = renderer
            .create(<Circle letter="T"/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с head', () => {
        const element = renderer
            .create(<Circle head={'test'}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с react-элементом в head', () => {
        const element = renderer
            .create(<Circle head={<Circle isSmall={true}/>}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с tail', () => {
        const element = renderer
            .create(<Circle tail="test"/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с react-элементом в tail', () => {
        const element = renderer
            .create(<Circle tail={<Circle isSmall={true}/>}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с index', () => {
        const element = renderer
            .create(<Circle index={0}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('с пропсом isSmall ===  true', () => {
        const element = renderer
            .create(<Circle isSmall={true}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('в состоянии default', () => {
        const element = renderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('в состоянии changing', () => {
        const element = renderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
    it('в состоянии modified', () => {
        const element = renderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON();
        expect(element).toMatchSnapshot();
    });
});