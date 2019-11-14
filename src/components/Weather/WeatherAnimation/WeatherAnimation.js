import React, {Component} from 'react';

class WeatherAnimation extends Component {

    render() {
        return (
            <div>
                <img src ={`http://openweathermap.org/img/w/${this.props.icon}.png`}
                     alt="wthr img" />
            </div>
        );
    }
}

export default WeatherAnimation;