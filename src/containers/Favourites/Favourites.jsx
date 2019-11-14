import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Favourite from "../../components/Favourite/Favourite";
import AxiosFirebase from './../../axios-firebase';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import cssClasses from "../SearchData/SearchData.module.css";
import Weather from "../../components/Weather/Weather";
import axiosOpenWeather from "../../axios-openWeather";
import cssStyles from './Favourites.module.css';
import CardDeck from "react-bootstrap/CardDeck";

class Favourites extends Component {

    state = {
        favourites: [],
        loading: true,
        showWeatherClicked: false,
        weather: {
            location: "",
            city: "",
            country: "",
            temperature: "",
            maxTemp: "",
            minTemp: "",
            pressure: "",
            humidity: "",
            icon: "",
            sunrise: "",
            sunset: "",
            clouds: "",
            windSpeed: "",
            weatherDescription: ""
        },
    };

    removeFromFavourites = (id) => {
        const array = this.props.favourites;

        AxiosFirebase.delete('/favourites/' + id + '.json?auth=' + this.props.token)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });

        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id)
                array.splice(i, 1)
        }
        this.setState({favourites: array, showWeatherClicked: false})
    };

    componentDidMount() {
        this.props.onFetchFavourites(this.props.token, this.props.userId);
    }

    showWeather = (city, country) => {

        axiosOpenWeather.get('weather?q=' + city + ',' + country + '&appid=68cbe56877c79ff898b48daef75033f8&units=metric')
            .then(response => {
                this.setState({
                    weather: {
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
                    },
                    showWeatherClicked: true
                });
            })
            .catch(error => {
                console.log(error)
            });

    };


    render() {

        let weather = null;

        if (this.state.showWeatherClicked) {
            weather = (
                <div className={cssClasses.SearchDataStyle}>
                    <Weather
                        weather={this.state.weather}
                    />
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <CardDeck>
                    {this.props.favourites.map(favourite => (
                        <Favourite
                            id={favourite.id}
                            key={favourite.id}
                            city={favourite.location}
                            country={favourite.countryCode}
                            wantToShowWeather={() => this.showWeather(favourite.location, favourite.countryCode)}
                            removeFromFavourites={() => this.removeFromFavourites(favourite.id, this.props.token)}
                        />
                    ))}
                </CardDeck>
                <div className={cssStyles.marginsForWeather}>{weather}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favourites: state.favourites.favourites,
        loading: state.favourites.loading,
        token: state.authentication.token,
        userId: state.authentication.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFavourites: (token, userId) => dispatch(actions.fetchFavourites(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favourites, AxiosFirebase));