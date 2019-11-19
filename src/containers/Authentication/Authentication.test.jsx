import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Authentication } from "./Authentication";
import { Redirect } from 'react-router-dom';



configure({ adapter: new Adapter() });



describe('<Authentication/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Authentication onSetAuthRedirectPath={() => {}}/>);
    });

    it('shouldnt redirect to main page', () => {
        wrapper.setProps({ isAuthenticated: false } );
        expect(wrapper.contains(<Redirect to="/favourites"/>)).toEqual(false);
    });

    it('should redirect to main page', () => {
        wrapper.setProps({ isAuthenticated: true } );
        expect(wrapper.contains(<Redirect to="/favourites"/>)).toEqual(true);
    });
});