import React from 'react';
import styles from "./Weather.module.css";
import WeatherAnimation from "./WeatherAnimation/WeatherAnimation";
import Moment from "react-moment";

const weather = (props) => {
    return (

        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 bg-light justify-content-center">
                            <div className={styles.Logo}>
                                <WeatherAnimation
                                    icon={props.weather.icon}/>
                            </div>
                        </div>
                        <div className="col-9 bg-light border-dark text-center">
                            {props.weather.city}, {props.weather.country}

                            <div className="row text-center">
                                <div className="col-12 bg-light rounded">
                                    <h6>Temperature:</h6>
                                    <div className="border-bottom h6">{props.weather.temperature} {'\u00b0'}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 bg-light rounded">
                                    <h6>Humidity:</h6>
                                    <div className="border-bottom h6">{props.weather.humidity} %</div>
                                </div>
                                <div className="col-6 bg-light rounded">
                                    <h6>Pressure:</h6>
                                    <div className="border-bottom h6">{props.weather.pressure} hPa</div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-6 bg-light rounded">
                                    <h6>Sunrise:</h6>
                                    <div className="border-bottom h6">
                                        <Moment format="hh:mm:ss A" unix>
                                            {props.weather.sunrise}
                                        </Moment>
                                    </div>
                                </div>
                                <div className="col-6 bg-light rounded">
                                    <h6>Sunset:</h6>
                                    <div className="border-bottom h6">
                                        <Moment format="hh:mm:ss A" unix>
                                            {props.weather.sunset}</Moment>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6 bg-light rounded">
                                    <h6>Min Temp:</h6>
                                    <div className="border-bottom h6">{props.weather.minTemp} {'\u00b0'}</div>
                                </div>
                                <div className="col-6 bg-light rounded">
                                    <h6>Max Temp:</h6>
                                    <div className="border-bottom h6">{props.weather.maxTemp} {'\u00b0'}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 bg-light border-bottom text-center">
                                    {props.weather.weatherDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default weather;