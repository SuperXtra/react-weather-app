import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Favourite from "../../components/Favourite/Favourite";
import AxiosFirebase from '../../axios/axios-firebase';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import cssClasses from "../SearchData/SearchData.module.css";
import Weather from "../../components/Weather/Weather";
import Modal from "../../components/UI/Modal/Modal";
import {ListGroup} from "react-bootstrap";

class Favourites extends Component {

    state = {
        favourites: [],
        showWeatherClicked: false,
        date: new Date()
    };

    removeFromFavourites = (id) => {

        const array = this.props.favourites;
        this.props.onRemoveFromFavourites(id, this.props.token)

        const  updatedArray = array.filter(element => element.id !== id);
        this.setState({favourites: updatedArray, showWeatherClicked: false})
    };

    componentDidMount() {
        this.props.onFetchFavourites(this.props.token, this.props.userId);
        this.props.onFetchCurrentTime(-33.85, 151.22);
        setInterval(
            () => this.setState({ date: new Date() }),
            1000
        );
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

        let favourites = <div className="text-center mt-5"><h3>Please add some positions to favourites!</h3></div>

        if(this.props.favourites.length !== 0) {
            favourites = (
                <ListGroup>
                    {this.props.favourites.map(favourite => (
                        <Favourite
                            id={favourite.id}
                            key={favourite.id}
                            date={this.state.date}
                            city={favourite.location}
                            country={favourite.countryCode}
                            wantToShowWeather={() => this.showWeather(favourite.location, favourite.countryCode)}
                            removeFromFavourites={() => this.removeFromFavourites(favourite.id)}
                        />
                    ))}
                </ListGroup>
            )
        }


        return (
            <div className="container-fluid">
                {favourites}
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
        onRemoveFromFavourites: (id, token) => dispatch(actions.removeFromFavourites(id, token)),
        onFetchCurrentTime: (lat, lng) => dispatch(actions.fetchCurrentTime(lat, lng))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favourites, AxiosFirebase));