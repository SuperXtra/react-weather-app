import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';

export const addToFavouritesStart = () => {
    return {
        type: actionTypes.ADD_TO_FAVOURITES_START
    }
};

export const addToFavouritesSuccess = (response) => {
    return {
        type: actionTypes.ADD_TO_FAVOURITES_SUCCESS,
        response: response
    }
};

export const addToFavouritesFail = (error) => {
    return {
        type: actionTypes.ADD_TO_FAVOURITES_FAIL,
        error: error
    }
};


export const fetchFavouritesStart = () => {
    return {
        type: actionTypes.FETCH_FAVOURITES_START
    };
};

export const fetchFavouritesSuccess = (favourites) => {
    return {
        type: actionTypes.FETCH_FAVOURITES_SUCCESS,
        favourites: favourites
    };
};

export const fetchFavouritesFail = (error) => {
    return {
        type: actionTypes.FETCH_FAVOURITES_FAIL,
        error: error
    };
};

export const fetchFavourites = (token, userId) => {
    return dispatch => {
        dispatch(fetchFavouritesStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/favourites.json' + queryParams)
            .then(response => {
                const fetchedFavourites = [];
                for (let key in response.data) {
                    fetchedFavourites.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchFavouritesSuccess(fetchedFavourites));
            })
            .catch(error => {
                dispatch(fetchFavouritesFail(error));
            });
    };
};

export const addToFavourites = (token, location, country, userId) => {
    return dispatch => {
        const data = {
            location: location,
            countryCode: country,
            userId: userId
        };
        dispatch(addToFavouritesStart());
        axios.post(`favourites.json?auth=${token}`, data)
            .then(response => {
                dispatch(addToFavouritesSuccess(response))
            })
            .catch(error => {
                dispatch(addToFavouritesFail(error))
            })
    }
};