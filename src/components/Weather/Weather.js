import React from 'react';
import WeatherComponent from "./WeatherComponent/WeatherComponent";

const weather = (props) => {
    return (
        <div>
            <WeatherComponent
                location={props.location}
                temperature={props.temperature}
                weatherDescription={props.weatherDescription}
                humidity={props.humidity}
                icon={props.icon}
                maxTemperature={props.maxTemp}
                minTemperature={props.minTemp}
                pressure={props.pressure}
                sunrise={props.sunrise}
                sunset={props.sunset}
                windSpeed={props.windSpeed}
                clouds={props.clouds}
            />
        </div>
    )
};

export default weather;