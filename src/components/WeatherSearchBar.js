import React, { Component } from 'react';


class WeatherSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.handleInputSearch = this.handleInputSearch.bind(this)
    }
    onInputChange(term) {
        this.setState({term});
    }
    onSubmit(term) {
        this.props.callData(term);
    }
    handleInputSearch(event){
        const {term} = this.state
        if (event.key === 'Enter') {
            event.preventDefault();
            this.onSubmit(term);
        }
    }
    render() {
        const {term} = this.state;
        return (
            <div className="searchBar-container">
                <input
                    className="searchCity-input"
                    value={term}
                    placeholder=" Insert City"
                    onKeyPress={this.handleInputSearch}
                    onChange={(event) => this.onInputChange(event.target.value)}
                />
                <button onClick={() => {this.onSubmit(term)}} className="searchCity-btn">Search</button>
            </div>
        );
    }
}
export default WeatherSearchBar;


