import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Favourite from "../../components/Favourite/Favourite";
import AxiosFirebase from './../../axios-firebase';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import cssClasses from "../SearchData/SearchData.module.css";
import Weather from "../../components/Weather/Weather";
import cssStyles from './Favourites.module.css';

class Favourites extends Component {

    state = {
        showWeatherClicked: false,
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
        this.props.onShowWeather(city, country);
        this.setState({showWeatherClicked: true})
    };


    render() {

        let weather = null;

        if (this.state.showWeatherClicked) {
            weather = (
                <div className={cssClasses.SearchDataStyle}>
                    <Weather
                        weather={this.props.weather}
                    />
                </div>
            );
        }

        return (
            <div className="container-fluid">
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
        userId: state.authentication.userId,
        weather: state.weatherData.weather
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFavourites: (token, userId) => dispatch(actions.fetchFavourites(token, userId)),
        onShowWeather: (city, country) => dispatch(actions.onFetchWeatherData(city, country))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favourites, AxiosFirebase));