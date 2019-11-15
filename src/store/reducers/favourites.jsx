import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    favourites: [],
    loading: false
};

const addToFavouritesFail = (state, action) => {
    return updateObject(state, {loading:false});
};

const addToFavouritesStart = (state, action) => {
    return updateObject(state, {loading:true});
};

const addToFavouritesSuccess = (state, action) => {
    return updateObject(state, {
        response: action.response,
        loading:false});
};

const removeFromFavouritesFail = (state, action) => {
    return updateObject(state, {loading: false})
};
const removeFromFavouritesSuccess = (state, action) => {
    return updateObject(state, {
        response: action.response,
        loading: false,
        showWeatherClicked: false
    })
};
const removeFromFavouritesStart = (state, action) => {
    return updateObject(state, {loading: true})
};

const fetchFavouritesFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchFavouritesStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchFavouritesSuccess = (state, action) => {
    return updateObject(state, {
        favourites: action.favourites,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FAVOURITES_START: return fetchFavouritesStart(state, action);
        case actionTypes.FETCH_FAVOURITES_SUCCESS: return fetchFavouritesSuccess(state, action);
        case actionTypes.FETCH_FAVOURITES_FAIL: return fetchFavouritesFail(state, action);
        case actionTypes.ADD_TO_FAVOURITES_START: return addToFavouritesStart(state, action);
        case actionTypes.ADD_TO_FAVOURITES_SUCCESS: return addToFavouritesSuccess(state, action);
        case actionTypes.ADD_TO_FAVOURITES_FAIL: return addToFavouritesFail(state, action);
        case actionTypes.REMOVE_FROM_FAVOURITES_START: return removeFromFavouritesStart(state, action);
        case actionTypes.REMOVE_FROM_FAVOURITES_SUCCESS: return removeFromFavouritesSuccess(state, action);
        case actionTypes.REMOVE_FROM_FAVOURITES_FAIL: return removeFromFavouritesFail(state, action);
        default: return state;
    }
};

export default reducer;