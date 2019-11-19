import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Backdrop from './Backdrop'

configure({ adapter: new Adapter() });

describe('<Backdrop/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Backdrop/>);
    });

    it('should check if backdrop is not rendered', () => {
        wrapper.setProps({show: false});
        expect(wrapper.get(0)).toEqual(null);
    });

    it('should check if backdrop is rendered', () => {
        wrapper.setProps({show: true});
        expect(wrapper.contains(<div className="Backdrop" />)).toEqual(true);
    })

});