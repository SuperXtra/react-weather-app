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
import axiosTimeZoneDB from "../../axios/axios-timezonedb";
import * as config from "../../configParameters";
import Clock from 'react-clock';


export class Favourites extends Component {

    state = {
        favourites: [],
        date: '',
        showWeatherClicked: false,
        showClockClicked: false,
    };

    fetchCurrentTime = (lat, lng) => {
        axiosTimeZoneDB.get(`${config.TIMEZONEDB_BASIC_URL}/v2.1/get-time-zone?key=${config.TIME_ZONE_DB}&format=json&by=position&lat=${lat}&lng=${lng}`)
            .then(response => {
                console.log(response);
                this.setState({
                    date: response.data.formatted,
                    showClockClicked: true})
            })
            .catch(error => {
                return error
            })
    };

    removeFromFavourites = (id) => {

        const array = this.props.favourites;
        this.props.onRemoveFromFavourites(id, this.props.token)

        const updatedArray = array.filter(element => element.id !== id);
        this.setState({favourites: updatedArray, showWeatherClicked: false})
    };

    componentDidMount() {
        this.props.onFetchFavourites(this.props.token, this.props.userId);
        this.setState({favourites: this.props.favourites})
    }

    showWeather = (city, country) => {
        this.props.onShowWeather(city, country);
        this.setState({showWeatherClicked: true})
    };

    weatherConfirmedHandler = () => {
        this.setState({showWeatherClicked: false});
    };

    clockConfirmedHandler = () => {
        this.setState({showClockClicked: false})
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

        let clock = null;

        if (this.state.showClockClicked && this.state.date) {
            clock = (
                <Clock value={new Date(this.state.date)}/>
            )
        }

        let favourites = <div className="text-center mt-5"><h3>Please add some positions to favourites!</h3></div>

        if (this.state.favourites.length !== 0) {
            favourites = (
                <ListGroup>
                    {this.state.favourites.map(favourite => (
                        <Favourite
                            id={favourite.id}
                            key={favourite.id}
                            city={favourite.location}
                            country={favourite.countryCode}
                            wantToShowWeather={() => this.showWeather(favourite.location, favourite.countryCode)}
                            wantToShowClock={() => this.fetchCurrentTime(favourite.lat, favourite.lng)}
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

                <Modal
                    show={this.state.showClockClicked}
                    modalClosed={this.clockConfirmedHandler}>
                    {clock}
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favourites, AxiosFirebase));