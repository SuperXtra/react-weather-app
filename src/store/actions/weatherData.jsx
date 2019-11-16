import * as actionTypes from './actionTypes';
import axiosOpenWeather from '../../axios-openWeather';
import * as config from './../../configParameters';

const API_KEY = config.OPEN_WEATHER_API_KEY;

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
        axiosOpenWeather.get(`weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
            .then(response => {
                    const weather = {
                        city: city,
                        country: country,
                        id: response.data.weather[0].id,
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
                        windSpeed: response.data.wind.speed,
                        lat: response.data.coord.lat,
                        lon: response.data.coord.lon
                    };
                    dispatch(fetchWeatherDataSuccess(weather))
                console.log(weather);

            })
            .catch(error => {
                dispatch(fetchWeatherDataFail(error))
            });
    };
};