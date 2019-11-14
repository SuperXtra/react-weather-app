import React from 'react';

import weatherForecastLogo from '../../assets/images/weatherForecastLogo.png';
import cssClasses from './Logo.module.css';

const logo = (props) => (
    <div className={cssClasses.Logo} style={{height: props.height}}>
        <img src={weatherForecastLogo} alt="WeatherForecastLogo" />
    </div>
);

export default logo;