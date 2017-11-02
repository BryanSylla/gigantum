import React, { Component } from "react";
//import TimePicker from 'material-ui/TimePicker';
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import "./searchbar.css";


class Searchbar extends Component{

state = {
    minTemp:"",
    maxTemp: "",
    maxPrecip: "",
    weatherData:""
    //time1:{},
    //time2:{}
    
  };

  componentDidUpdate(){
    console.log(this.state.weatherData)
  }

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

   handleFormSubmit = event => {
    event.preventDefault();

      API.getWeatherData().then(res=>this.setState({
    //minTemp:"",
    //maxTemp: "",
    //maxPrecip: "",
    weatherData:res
  }))
       
    
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
                type="number"
              />

              <Input
                value={this.state.maxTemp}
                onChange={this.handleInputChange}
                name="maxTemp"
                placeholder="What is the maximum temperature °F (required)?"
                type="number"
              />

              <Input
                value={this.state.maxPrecip}
                onChange={this.handleInputChange}
                name="maxPrecip"
                placeholder="What is the maximum precipation % (required)?"
                type="number"
              />

          {/*   <TimePicker
      hintText="What time would you like to travel at? (12hr Format)"
                value={this.state.time1}
                onChange={this.handleInputChange}
                name="time1"
               
    />

     <TimePicker
      hintText="What other time would you like to travel at? (12hr Format)"
       value={this.state.time2}
                onChange={this.handleInputChange}
                name="time2"
              
    />*/}

               
              
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