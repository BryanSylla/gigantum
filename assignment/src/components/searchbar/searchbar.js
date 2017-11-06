import React, { Component } from "react";
//import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import Paper from 'material-ui/Paper';
import {  Row, Col } from 'react-bootstrap'
import {BikeOrMetro} from "../BikeOrMetro";
import "./searchbar.css";

//main page component
class Searchbar extends Component{

	state = {
    	minTemp:"",
    	maxTemp: "",
    	maxPrecip: "",
    	weatherData:"",
    	//time1:{},
    	//time2:{}
    	styleSidebar : {
  			margin: '16px 32px 16px 0',
  			padding: '150px'
		},

		styleForm : {
  			padding: '20px'
		},

		styleMain : {
			backgroundSize: 'cover'
		},

		image:'https://nancieteresa.files.wordpress.com/2015/01/grunge-travel-background-239421341.jpg',

		settings: {
			minTemp:"",
    		maxTemp: "",
    		maxPrecip: "",
		}
    	
  };

  

	componentDidUpdate(){
    	console.log(this.state.weatherData);//used to check if weatherData state was succesfully and correctly updated
  }

  	//handles inputs, watches and automatically updates states
	handleInputChange = event => {
    	const { name, value } = event.target;
    	this.setState({
      		[name]: value
    	});
    };

   //makes http request and after response resets form and updates weatherData state
   handleFormSubmit = event => {
   		event.preventDefault();

      	API.getWeatherData()
      	.then(res=>this.setState({
    		weatherData:res
  		}))
      	.then(res=>this.setState({
    		settings: {
			minTemp:this.state.minTemp,
    		maxTemp: this.state.maxTemp,
    		maxPrecip: this.state.maxPrecip,
			},
			minTemp:"",
    		maxTemp: "",
    		maxPrecip: "",
  		}))
      	
       
    
  	};


	render() {
    	return (

			<div className="wrapper">
				<Row>
					<Col md={4}>
					
    				<Drawer width={390} style={this.state.styleSidebar} >
           					{this.state.settings.minTemp && this.state.settings.maxTemp && this.state.settings.maxPrecip ?<div><h2>minTemp: {this.state.settings.minTemp}°F</h2><h2> maxTemp: {this.state.settings.maxTemp}°F</h2><h2> maxPrecip: {this.state.settings.maxPrecip}%</h2></div>: <h3>Settings</h3> }
             				<Divider />
        				 
             				
        				 <form style={this.state.styleForm}>
        				 
              			 	<Input
                				value={this.state.minTemp}
                				onChange={this.handleInputChange}
                				name="minTemp"
                				placeholder="What is the minimum temperature °F (required)?"
                				type="number"
                				max={this.state.maxTemp}
                				min="-150"
              				/>

             				<Input
                				value={this.state.maxTemp}
                				onChange={this.handleInputChange}
                				name="maxTemp"
                				placeholder="What is the maximum temperature °F (required)?"
               					type="number"
               					min={this.state.minTemp}
               					max="150"
             				/>

              				<Input
                				value={this.state.maxPrecip}
                				onChange={this.handleInputChange}
                				name="maxPrecip"
                				placeholder="What is the maximum precipation % (required)?"
                				type="number"
              				/>

							<FormBtn
                				disabled={!(this.state.minTemp && this.state.maxTemp && this.state.maxPrecip)}
                				onClick={this.handleFormSubmit}
              				>
                				Search
              				</FormBtn>

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
    					</form>
    					
    				</Drawer>
    			
					</Col>
				</Row>
				<Row>
					<Col md={8}>
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
            ) : (<div style = {{backgroundImage: `url(${this.state.image})`}} id="content" ><h3 >Go ahead and hit the search button with your preferences</h3></div>)
     					}
       
    				</div>
    				</Col>
    			</Row>

			</div>
				);
			 }
}
export default Searchbar;