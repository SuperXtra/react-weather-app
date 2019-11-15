import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Favourite from "../../components/Favourite/Favourite";
import AxiosFirebase from './../../axios-firebase';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import cssClasses from "../SearchData/SearchData.module.css";
import Weather from "../../components/Weather/Weather";
import Modal from "../../components/UI/Modal/Modal";

class Favourites extends Component {

    state = {
        favourites: [],
        showWeatherClicked: false
    };

    removeFromFavourites = (id) => {

        const array = this.props.favourites;
        this.props.onRemoveFromFavourites(id, this.props.token)

        const  updatedArray = array.filter(element => element.id !== id);
        this.setState({favourites: updatedArray, showWeatherClicked: false})
    };

    componentDidMount() {
        this.props.onFetchFavourites(this.props.token, this.props.userId);
    }

    showWeather = (city, country) => {
        this.props.onShowWeather(city, country);
        this.setState({showWeatherClicked: true})
    };


    weatherConfirmedHandler = () => {
        this.setState( { showWeatherClicked: false } );
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
                            removeFromFavourites={() => this.removeFromFavourites(favourite.id)}
                        />
                    ))}
                <Modal
                    show={this.state.showWeatherClicked}
                    modalClosed={this.weatherConfirmedHandler}>
                    {weather}
                </Modal>
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
        onShowWeather: (city, country) => dispatch(actions.onFetchWeatherData(city, country)),
        onRemoveFromFavourites: (id, token) => dispatch(actions.removeFromFavourites(id, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favourites, AxiosFirebase));