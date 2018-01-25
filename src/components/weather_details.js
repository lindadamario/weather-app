import React, { Component } from 'react';




const WeatherDetails = (props) => {

    return(
        <div className="cityDetails">
            <div className="details">
                <h1>{props.city}</h1>
                <h3>{props.temp}°</h3>
                <p>Current Temperature</p>
            </div>
            <div className="temperatures">
                <div className="max_min_temp">
                <ul className="maxMinTemp">
                    <li>
                        <p id="minTemp-value">{props.minTemp}°</p>
                        <p id="minTemp-caption">Min</p>
                    </li>
                    <li>
                        <p id="maxTemp-value">{props.maxTemp}°</p>
                        <p id="maxTemp-caption">Min</p>
                    </li>
                </ul>
                </div>
                <p>{props.description}</p>
            </div>
        </div>
    );
}



export default WeatherDetails;