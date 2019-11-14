import React from 'react';
import cssStyles from './WeatherAnimation.module.css';

const WeatherAnimation = (props) => {
    return (
        <div className={cssStyles.Image} style={{height: props.height}}>
            <img src ={`http://openweathermap.org/img/w/${props.icon}.png`}
                 alt="wthr img" />
        </div>
    )
};

export default WeatherAnimation;
