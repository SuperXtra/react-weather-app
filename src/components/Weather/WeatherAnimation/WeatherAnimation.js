import React from 'react';

const WeatherAnimation = (props) => {

    const iconString = `owf owf-${props.id} owf-4x`;

    return (
        <div>
            <i className={iconString}/>
        </div>
    )
};

export default WeatherAnimation;
