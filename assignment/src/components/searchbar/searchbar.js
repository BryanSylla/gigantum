import React, { Component } from "react";
//import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import Paper from 'material-ui/Paper';
import { Col, Row} from "../../components/Grid";
import {BikeOrMetro} from "../BikeOrMetro";
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

      API.getWeatherData()
      .then(res=>this.setState({
    minTemp:"",
    maxTemp: "",
    maxPrecip: "",
    weatherData:res
  }))
       
    
  };


render() {
    return (

<div className="wrapper">
<Row>
<Col size="md-4">

    <nav id="sidebar">
        <div className="sidebar-header">
           {this.state.minTemp && this.state.maxTemp && this.state.maxPrecip ?<h2>minTemp: {this.state.minTemp}°F maxTemp: {this.state.maxTemp}°F maxPrecip: {this.state.maxPrecip}%</h2>: <h3>Settings</h3> }
             <Divider />
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
                disabled={!(this.state.minTemp && this.state.maxTemp && this.state.maxPrecip) || (this.state.minTemp >this.state.maxTemp) }
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
 
    </nav>
</Col>
</Row>
<Row>
<Col size="md-12">
    <div id="content" >
    
     {this.state.weatherData.length ? (
      <Paper zDepth={4}>
              <List>
                {this.state.weatherData.map(weatherDataItem  => 
                  <ListItem>
                  <Subheader>{weatherDataItem.date}</Subheader>
                  <Divider />
                  <div>
                  <h4>Time (Military): {weatherDataItem.time1.time} Temperature: {weatherDataItem.temp1} Chances It Will Rain: {weatherDataItem.precip1}%</h4>
                  <BikeOrMetro comparison={weatherDataItem.temp1<this.state.minTemp || weatherDataItem.temp1>this.state.maxTemp || this.state.maxPrecip<weatherDataItem.precip1 } />
                  </div>
                  <div>
                  <h4>Time (Military): {weatherDataItem.time2.time} Temperature: {weatherDataItem.temp2} Chances It Will Rain: {weatherDataItem.precip2}%</h4>
                  <BikeOrMetro comparison={weatherDataItem.temp2<this.state.minTemp || weatherDataItem.temp2>this.state.maxTemp || this.state.maxPrecip<weatherDataItem.precip2 } />
                  </div>
                  </ListItem>
                 
                )}
              </List>
              </Paper>
            ) : (
           
              <h3>Go ahead and hit the search button with your preferences</h3>

            )}
       
    </div>
    </Col>
    </Row>

</div>
);
}
}
export default Searchbar;