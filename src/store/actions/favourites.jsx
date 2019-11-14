import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';


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