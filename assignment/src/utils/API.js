import axios from "axios";

const longitude=-77.464327;
const lattitude=37.560478;
const secretKey='f3a6f2c7007cb9fc8d72d0e6d4399b19';

export default {

	getWeatherData: function (minTemp,maxTemp,maxPrecip){

		return axios.get('https://api.darksky.net/forecast/'+secretKey+'/'+lattitude+','+longitude+'?exclude=currently,flags,minutely,hourly,alerts')
	}





















};