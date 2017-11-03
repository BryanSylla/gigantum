import axios from "axios";

	const longitude=-77.464327;
	const lattitude=37.560478;
	const secretKey='f3a6f2c7007cb9fc8d72d0e6d4399b19';
	const proxyurl='https://cryptic-headland-94862.herokuapp.com/'

export default {

	timeConverter: function(unixTimestamp){

		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var date = new Date(unixTimestamp*1000);
		
		var hours = date.getHours(); // Hours part from the timestamp
		
		var minutes = "0" + date.getMinutes(); // Minutes part from the timestamp
		
		var seconds = "0" + date.getSeconds(); // Seconds part from the timestamp

		var formattedTime ={};

		// Will display time in 10:30:23 format and date in Fri Nov 03 2017
		formattedTime.time= hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		formattedTime.date= date.toString().substr(0,15);

		return formattedTime; //returns newly formatted date as an object
},
	// makes API call
	getWeatherData: function (){

		let reformattedData=[]; //array that will store an array of objects; objects contain parsed API data 
		let i=0; //index which will control how many API calls are made
		let currentTimeStamp = Math.floor(Date.now() / 1000); //stores current time in Unix seconds time
		// console.log(currentTimeStamp);

		// makes API call; each call grabs hourly weather information of a particular day
 		let recursionFunction=()=> (
 			axios.get(proxyurl+'https://api.darksky.net/forecast/'+secretKey+'/'+lattitude+','+longitude+','+currentTimeStamp+'?exclude=currently,flags,minutely,daily,alerts&extend=hourly')
 			.then(res=> this.parseWeatherData(res)).then(res=> { // response from API call sent through parser

 			reformattedData.push(res); // parsed weather data in stored in the array that will be sent to the front end
 			currentTimeStamp+=86400; // the number of seconds in a day, added to grab API data for the next day
 			i+=1; //updates index
 			//console.log(reformattedData);

 			if(i<7){
 				return recursionFunction(); // makes API call again for the next day
 			}
 	
 			else{
 				//console.log(reformattedData);
				return reformattedData; // returns final array of weather data objects 
 			}

 		}).catch(function (error) {
    		console.log(error);
  			})			
		);
		return recursionFunction(); 
	},

	//parses weather data from API to select endpoints of interest
	//time1=8 AM & time2=5 PM
	//temperatures at both times
	//precipitation % at both times
	parseWeatherData:function(weatherData){

		let dataPoint= {};//object will store endpoints of interest for a particular time on a particular day
		for(let i=8;i<weatherData.data.hourly.data.length;i=i+24){
			
			dataPoint.date=this.timeConverter(weatherData.data.hourly.data[i].time).date

			dataPoint.time1=this.timeConverter(weatherData.data.hourly.data[i].time);
			dataPoint.temp1=weatherData.data.hourly.data[i].temperature;
			dataPoint.precip1=Math.floor((weatherData.data.hourly.data[i].precipProbability)*100);

			dataPoint.time2=this.timeConverter(weatherData.data.hourly.data[i+9].time);
			dataPoint.temp2=weatherData.data.hourly.data[i+9].temperature;
			dataPoint.precip2=Math.floor((weatherData.data.hourly.data[i+9].precipProbability)*100);
		}
		//console.log(dataPoint);
		return dataPoint;
	}

};