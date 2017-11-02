import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import "./searchbar.css";


class Searchbar extends Component{

state = {
    minTemp:"",
    maxTemp: "",
    maxPrecip: ""
    
  };

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

   handleFormSubmit = event => {
    event.preventDefault();

      API.getWeatherData(this.state.minTemp,this.state.maxTemp,this.state.maxPrecip)
        .then(res => console.log(res));
        //.catch(err => console.log(err));
    
  };

render() {
    return (

<div className="wrapper">

    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>Settings</h3>
        </div>

        <form>
              <Input
                value={this.state.minTemp}
                onChange={this.handleInputChange}
                name="minTemp"
                placeholder="What is the minimum temperature °F (required)?"
              />

              <Input
                value={this.state.maxTemp}
                onChange={this.handleInputChange}
                name="maxTemp"
                placeholder="What is the maximum temperature °F (required)?"
              />

              <Input
                value={this.state.minPrecip}
                onChange={this.handleInputChange}
                name="maxPrecip"
                placeholder="What is the maximum precipation % (required)?"
              />
              
              <FormBtn
                disabled={!(this.state.minTemp && this.state.maxTemp && this.state.maxPrecip)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>

    </nav>
    <div id="content">
        
    </div>

</div>
);
}
}
export default Searchbar;