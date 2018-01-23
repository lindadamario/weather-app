import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
            mainDescription: '',
            description: '',
            icon: '',
            err: ''
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        //this.fetchData(this.state.city);
    }


    fetchData(city) {
        console.log(city);
        this.setState({isLoading: true})
        fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=1023390133ff9da7ade5a993d987373a&units=metric`)
            .then(response => response.json())
            .then(parsedJSON => {
                console.log(parsedJSON)
                this.setState({
                    city: parsedJSON.name,
                    isLoading: false,
                    humidity: parsedJSON.humidity,
                    temp: parsedJSON.main.temp,
                    minTemp: parsedJSON.main.temp_min,
                    maxTemp: parsedJSON.main.temp_max,
                    mainDescription: parsedJSON.weather[0].main,
                    description: parsedJSON.weather[0].description,
                    icon: parsedJSON.main.icon,
                    err: ''
                })

            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    err: 'City not found'
                })
            })
    }

    

    render() {

        const {
            isLoading,
            city,
            temp,
            humidity,
            minTemp,
            maxTemp,
            mainDescription,
            description,
            icon,
            err
            } = this.state;

        return(
            <div className="weatherApp-container">
                {isLoading ? <h1>Loading...</h1> : null}
                {err ? <h3>{err}</h3> : null}
                    <div className="toggleDegrees">
                        <button>*C</button>
                        <button>*F</button>
                    </div>

                <WeatherSearchBar callData={this.fetchData} />
                <WeatherDetails
                    temperature= {temp}
                    city= {city}
                    humidity={humidity}
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    mainDescription={mainDescription}
                    description={description}
                    icon={icon} />
            </div>
        );
    }
}


ReactDOM.render(<WeatherApp />, document.getElementById('root'));
registerServiceWorker();
