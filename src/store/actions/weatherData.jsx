import * as actionTypes from './actionTypes';
import axiosOpenWeather from '../../axios-openWeather';

export const fetchWeatherDataStart = () => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_START
    };
};

export const fetchWeatherDataSuccess = (weather) => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_SUCCESS,
        weather: weather
    };
};

export const fetchWeatherDataFail = (error) => {
    return {
        type: actionTypes.FETCH_WEATHER_DATA_FAIL,
        error: error
    };
};

export const onFetchWeatherData = (city, country) => {
    return dispatch => {
        dispatch(fetchWeatherDataStart());
        axiosOpenWeather.get('weather?q=' + city + ',' + country + '&appid=68cbe56877c79ff898b48daef75033f8&units=metric')
            .then(response => {
                    const weather = {
                        city: city,
                        country: country,
                        temperature: response.data.main.temp,
                        maxTemp: response.data.main.temp_max,
                        minTemp: response.data.main.temp_min,
                        pressure: response.data.main.pressure,
                        humidity: response.data.main.humidity,
                        icon: response.data.weather[0].icon,
                        weatherDescription: response.data.weather[0].description,
                        sunrise: response.data.sys.sunrise,
                        sunset: response.data.sys.sunset,
                        clouds: response.data.clouds.all,
                        windSpeed: response.data.wind.speed
                    };
                    dispatch(fetchWeatherDataSuccess(weather))
                })
            .catch(error => {
                dispatch(fetchWeatherDataFail(error))
            });
    };
};