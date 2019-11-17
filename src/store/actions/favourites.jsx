import * as actionTypes from './actionTypes';
import axiosFirebase from '../../axios/axios-firebase';
import axiosTimeZoneDB from '../../axios/axios-timezonedb';
import * as config from '../../configParameters';

export const fetchCurrentTimeStart = () => {
    return {
        type: actionTypes.FETCH_CURRENT_TIME_START
    }
};

export const fetchCurrentTimeSuccess = (time) => {
    return {
        type: actionTypes.FETCH_CURRENT_TIME_SUCCESS,
        time: time
    }
};

export const fetchCurrentTimeFail = (error) => {
    return {
        type: actionTypes.FETCH_CURRENT_TIME_FAIL,
        error: error
    }
};

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

export const removeFromFavouritesStart = () => {
    return {
        type: actionTypes.REMOVE_FROM_FAVOURITES_START
    }
};

export const removeFromFavouritesSuccess = (response) => {
    return {
        type: actionTypes.REMOVE_FROM_FAVOURITES_SUCCESS,
        response: response
    }
};

export const removeFromFavouritesFail = (error) => {
    return {
        type: actionTypes.REMOVE_FROM_FAVOURITES_FAIL,
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
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axiosFirebase.get(`/favourites.json${queryParams}`)
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
        axiosFirebase.post(`favourites.json?auth=${token}`, data)
            .then(response => {
                dispatch(addToFavouritesSuccess(response))
            })
            .catch(error => {
                dispatch(addToFavouritesFail(error))
            })
    }
};

export const removeFromFavourites = (id, token) => {
    return dispatch => {
        dispatch(removeFromFavouritesStart());
        axiosFirebase.delete(`/favourites/${id}.json?auth=${token}`)
            .then(response => {
                dispatch(removeFromFavouritesSuccess(response))
            })
            .catch(error => {
                dispatch(removeFromFavouritesFail(error))
            })
    }
};

export const fetchCurrentTime = (lat, lng) => {
    return dispatch => {
        dispatch(fetchCurrentTimeStart());
        axiosTimeZoneDB.get(`/v2.1/get-time-zone?key=${config.TIME_ZONE_DB}&format=json=position&lat=${lat}&lng=${lng}`)
            .then(response => {
                console.log(response);
                dispatch(fetchCurrentTimeSuccess(response))
            })
            .catch(error => {
                dispatch(fetchCurrentTimeFail(error))
            })
    }
};

//TO DO fetch current time when loading