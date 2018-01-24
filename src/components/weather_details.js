import React, { Component } from 'react';



const WeatherDetails = (props) => {

    return(
        <div className="cityDetails">
            <h1>{props.city}</h1>
            <h3>{props.temp}</h3>
            <p>Current Temperature</p>
            <ul className="maxMinTemp">
                <li>
                    <p id="minTemp-value">{props.minTemp}</p>
                    <p id="minTemp-caption">Min</p>
                </li>
                <li>
                    <p id="maxTemp-value">{props.maxTemp}</p>
                    <p id="maxTemp-caption">Min</p>
                </li>
            </ul>
            <p>{props.description}</p>
        </div>
    );
}



export default WeatherDetails;