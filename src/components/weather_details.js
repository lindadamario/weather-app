import React, { Component } from 'react';



const WeatherDetails = (props) => {
// I define a variable that has one argument: city
// and i replace the content inside the tags with the content in the api


    return(
        <div className="cityDetails">
            <h1>{props.city}</h1>
            <img src={props.icon} alt="" />
            <h3>{props.temp}</h3>
            <ul>
                <li>{props.minTemp}</li>
                <li>{props.maxTemp}</li>
            </ul>
            <p>{props.mainDescription}</p>
            <p>{props.description}</p>
        </div>
    );
}



export default WeatherDetails;