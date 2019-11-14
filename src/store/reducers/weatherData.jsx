import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    weather: "",
    loading: false,
    loaded: false
};

const fetchWeatherDataFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchWeatherDataStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchWeatherDataSuccess = (state, action) => {
    return updateObject(state, {
        weather: action.weather,
        loading: false,
        loaded: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHER_DATA_START: return fetchWeatherDataStart(state, action);
        case actionTypes.FETCH_WEATHER_DATA_SUCCESS: return fetchWeatherDataSuccess(state, action);
        case actionTypes.FETCH_WEATHER_DATA_FAIL: return fetchWeatherDataFail(state, action);
        default: return state;
    }
};

export default reducer;