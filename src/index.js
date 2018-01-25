import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'background.jpg';
import fetch from 'isomorphic-fetch';
import WeatherSearchBar from './components/weather_searchBar';
import WeatherDetails from './components/weather_details';
import registerServiceWorker from './registerServiceWorker';


class WeatherApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            city: '',
            isLoading: false,
            humidity: '',
            temp: '',
            minTemp: '',
            maxTemp: '',
            description: '',
            err: '',
            tempUnit: 'celsius'
        }
        this.fetchData = this.fetchData.bind(this)
        this.convertToFahrenheit = this.convertToFahrenheit.bind(this)
        this.convertToCelsius = this.convertToCelsius.bind(this)
    }

    componentDidMount() {
        this.fetchData('Helsinki');
    }


    fetchData(city) {
        this.setState({isLoading: true})
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1023390133ff9da7ade5a993d987373a&units=metric`)
            .then(response => response.json())
            .then(parsedJSON => {
                console.log(parsedJSON)
                this.setState({
                    city: parsedJSON.name,
                    isLoading: false,
                    humidity: parsedJSON.humidity,
                    temp: Math.round(parsedJSON.main.temp),
                    minTemp: Math.round(parsedJSON.main.temp_min),
                    maxTemp: Math.round(parsedJSON.main.temp_max),
                    description: parsedJSON.weather[0].description,
                    err: ''
                })

            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    err: 'City not found',
                    city: '',
                    temp: '',
                    minTemp: '',
                    maxTemp: '',
                    description: '',
                })
            })
    }

    convertToFahrenheit(value) {
        if(this.state.tempUnit === 'celsius') {
            const fahrenheit = (value * 9 / 5) + 32;
            this.setState({
                tempUnit: 'toFahrenheit',
                temp: Math.round(fahrenheit)
            })
        }
    }

    convertToCelsius(value) {
        if(this.state.tempUnit === 'toFahrenheit') {
            const celsius = (5/9) * (value - 32);
            this.setState({
                tempUnit: 'celsius',
                temp: Math.round(celsius)
            })
        }
    }

    render() {

        const {
            isLoading,
            city,
            temp,
            humidity,
            minTemp,
            maxTemp,
            description,
            err,
            tempUnit,
            } = this.state;

        return(
            <div className="weatherApp-container">
                <WeatherSearchBar callData={this.fetchData} />
                {isLoading ? <h1>Loading...</h1> : null}
                {err ? <h3>{err}</h3> : null }
                {city ?
                    <div className="weatherApp-subContainer">
                        <div className="toggleDegrees">
                            <button onClick={() => this.convertToCelsius(temp)}>°C</button>
                            <button onClick={() => this.convertToFahrenheit(temp)}>°F</button>
                        </div>
                    <div>
                    <WeatherDetails
                    temp= {temp}
                    city= {city}
                    humidity={humidity}
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    description={description} />
                    </div>
                </div> : ''}
            </div>

        );
    }
}


ReactDOM.render(<WeatherApp />, document.getElementById('root'));
registerServiceWorker();
