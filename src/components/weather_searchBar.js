import React, { Component } from 'react';


class WeatherSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onSubmit=this.onSubmit.bind(this)
    }

    onInputChange(term) {
        this.setState({term});
    }

    onSubmit(term) {
        this.props.callData(term);
    }

    render() {

        const {term} = this.state;
        return (
            <div>
                <input
                    className="searchCity-input"
                    value={this.state.term}
                    placeholder="Insert city"
                    onChange={event => this.onInputChange(event.target.value)}
                />
                <button onClick={() => {this.onSubmit(term)}} className="searchCity-btn">Search</button>
            </div>
        );
    }
}
export default WeatherSearchBar;


