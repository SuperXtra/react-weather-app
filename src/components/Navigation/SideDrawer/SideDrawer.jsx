import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if (props.open) {
        attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                    isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;