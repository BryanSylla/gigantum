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
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();


var formattedTime ={};
// Will display time in 10:30:23 format and date in Fri Nov 03 2017
formattedTime.time= hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
formattedTime.date= date.toString().substr(0,15);

return formattedTime;
},

	getWeatherData: function (){
			let reformattedData=[];
			let i=0;
let currentTimeStamp = Math.floor(Date.now() / 1000);
console.log(currentTimeStamp);

 let recursionFunction=()=> (axios.get(proxyurl+'https://api.darksky.net/forecast/'+secretKey+'/'+lattitude+','+longitude+','+currentTimeStamp+'?exclude=currently,flags,minutely,daily,alerts&extend=hourly')
 .then(res=> this.parseWeatherData(res)).then(res=> {

 	reformattedData.push(res);
 	currentTimeStamp+=86400;
 	i+=1;
 	//console.log(reformattedData);
 	if(i<7){
 		return recursionFunction();
 	}
 	
 else{
 	//console.log(reformattedData);
		return reformattedData;
 }

 }).catch(function (error) {
    console.log(error);
  })		
	);

 return recursionFunction();
},

//

	parseWeatherData:function(weatherData){

		
		let dataPoint= {};
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