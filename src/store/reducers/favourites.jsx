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
        case actionTypes.ADD_TO_FAVOURITES_START: return addToFavouritesStart;
        case actionTypes.ADD_TO_FAVOURITES_SUCCESS: return addToFavouritesSuccess;
        case actionTypes.ADD_TO_FAVOURITES_FAIL: return addToFavouritesFail;
        default: return state;
    }
};

export default reducer;