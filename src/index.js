import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fetch from 'isomorphic-fetch';
import WeatherSearchBar from './components/WeatherSearchBar';
import WeatherDetails from './components/WeatherDetails';


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
                description: ''
            })
        })
    }
    convertToFahrenheit(value) {
        if(this.state.tempUnit === 'celsius') {
            const fahrenheit = (value * 9 / 5) + 32;
            const currentMinTemp = (this.state.minTemp * 9 / 5) + 32
            const currentMaxTemp = (this.state.maxTemp * 9 / 5) + 32
            this.setState({
                tempUnit: 'toFahrenheit',
                temp: Math.round(fahrenheit),
                minTemp: Math.round(currentMinTemp),
                maxTemp: Math.round(currentMaxTemp)
            })
        }
    }
    convertToCelsius(value) {
        if(this.state.tempUnit === 'toFahrenheit') {
            const celsius = (5/9) * (value - 32);
            const currentMinTemp = (5/9) * (this.state.minTemp - 32)
            const currentMaxTemp = (5/9) * (this.state.maxTemp - 32)
            this.setState({
                tempUnit: 'celsius',
                temp: Math.round(celsius),
                minTemp: Math.round(currentMinTemp),
                maxTemp: Math.round(currentMaxTemp)
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

        const body = (
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
            </div>
        );
        return(
            <div className="weatherApp-container">
                <WeatherSearchBar callData={city => this.fetchData(city)} />
                {isLoading ? <h1>Loading...</h1> : null}
                {err ? <h3>{err}</h3> : null }
                {city ? body : ''}
            </div>
        );
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));