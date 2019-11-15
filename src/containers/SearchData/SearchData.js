import React, {Component} from 'react';
import Weather from "../../components/Weather/Weather";
import {connect} from 'react-redux';
import axiosOpenWeather from './../../axios-openWeather';
import axiosFirebase from './../../axios-firebase';
import cssClasses from './SearchData.module.css'
import WithErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions";

class SearchData extends Component {

    addToFavouritesEvent = (event) => {
        event.preventDefault();
        this.props.addToFavourites(this.props.token, this.props.weather.city, this.props.weather.country, this.props.userId);
    };



    getWeather = (event) => {
        event.preventDefault();

        const city = event.target.city.value.toUpperCase();
        const country = event.target.country.value.toUpperCase();

        this.props.fetchWeatherData(city, country);
    };

    render() {

        const inputForm = (
            <div className="d-flex justify-content-center align-items-center container ">
                <form onSubmit={this.getWeather}>
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <input className="form-control mb-2" type="text" name="city" placeholder="City..."/>
                        </div>
                        <div className="col-auto">
                            <input className="form-control mb-2" type="text" name="country" placeholder="Country..."/>
                        </div>
                    </div>
                    <div className={cssClasses.CenterButton}>
                        <button type="submit" className="btn btn-primary mb-2">Get Weather</button>
                    </div>
                </form>
            </div>
        );


             const addToFavouritesButton = (
                <div className={cssClasses.CenterButton}>
                    <button
                        onClick={this.addToFavouritesEvent}
                        className="btn btn-primary mb-2"
                        disabled={!this.props.isAuthenticated}>{this.props.isAuthenticated ? 'Add to Favourites' : 'Log in to add'}</button>
                </div>
            );

        let weather = null;

        if (this.props.loaded) {
            weather = (
                <div className="d-flex justify-content-center align-items-center container">
                    <div>
                        <Weather
                            weather={this.props.weather}/>
                        {addToFavouritesButton}
                    </div>
                </div>
            );
        }


        return (
            <div>
                {inputForm}
                {weather}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        userId: state.authentication.userId,
        isAuthenticated: state.authentication.token !== null,
        weather: state.weatherData.weather,
        loaded: state.weatherData.loaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWeatherData: (city, country) => dispatch(actions.onFetchWeatherData(city, country)),
        addToFavourites: (token, location, country, userId) => dispatch(actions.addToFavourites(token, location, country, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(SearchData, axiosFirebase, axiosOpenWeather));