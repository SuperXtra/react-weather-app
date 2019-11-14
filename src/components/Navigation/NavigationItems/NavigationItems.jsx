import React from 'react';

import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/" exact>Check weather</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/favourites">Favourites</NavigationItem> : null }
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;