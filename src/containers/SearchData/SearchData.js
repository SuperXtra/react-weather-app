import React, {Component} from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import {FormText} from "react-bootstrap";
import Weather from "../../components/weather/Weather";
import axios from './../../axios-openWeather';

class SearchData extends Component {

    state = {
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
        windSpeed:"",
        weatherDescription:"",
        searchDataAvailable: false
    };


    getWeather = (event) => {
        event.preventDefault();

        const city = event.target.city.value;
        const countryId = event.target.country.value;

        this.setState({location: city + ", " + countryId});

        if (city && countryId){
            axios.get('weather?q=' + city + ',' + countryId + '&appid=68cbe56877c79ff898b48daef75033f8&units=metric')
                .then(response => {
                    this.setState({
                        temperature: response.data.main.temp,
                        maxTemp: response.data.main.temp_max,
                        minTemp: response.data.main.temp_min,
                        pressure: response.data.main.pressure,
                        humidity: response.data.main.humidity,
                        icon: response.data.weather[0].icon,
                        weatherDescription:response.data.weather[0].description,
                        sunrise: response.data.sys.sunrise,
                        sunset: response.data.sys.sunset,
                        clouds: response.data.clouds.all,
                        windSpeed:response.data.wind.speed,
                        searchDataAvailable: true
                    });
                    console.log(response.data);
                    console.log(this.state.temperature)
                })
                .catch(error => {
                    console.log(error)
                });
        }

    };

    // const apiKey = "68cbe56877c79ff898b48daef75033f8";




    render() {
        // let inputForm = (
        //     <form>
        //         <FormGroup controlId="formBasicCity">
        //             <FormControl type="text" placeholder="Enter City"/>
        //             <FormText className="text-muted">
        //                 Please provide city of which you would like to check weather.
        //             </FormText>
        //         </FormGroup>
        //     </form>
        // );

        const inputForm = (
            <form onSubmit={this.getWeather}>
                <input type="text" name="city" placeholder="City..."/>
                <input type="text" name="country" placeholder="Country..."/>
                <button>Get Weather</button>
            </form>
        );

        let weather = null;

        if (this.state.searchDataAvailable){
            weather = (
                <Weather
                    location={this.state.location}
                    maxTemperature={this.state.maxTemp}
                    icon={this.state.icon}
                    minTemperature={this.state.minTemp}
                    pressure={this.state.pressure}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    weatherDescription={this.state.weatherDescription}
                    windSpeed={this.state.windSpeed}
                    temperature={this.state.temperature}
                    clouds={this.state.clouds}
                    humidity={this.state.humidity}/>
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

export default SearchData;