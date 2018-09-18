import { TempArray } from './temparray.model';
/**
*apparentTemperatureHigh: 93.54
*apparentTemperatureHighTime: 1537221600
*apparentTemperatureLow: 71.54
*apparentTemperatureLowTime: 1537268400
*apparentTemperatureMax: 93.54
*apparentTemperatureMaxTime: 1537221600
*apparentTemperatureMin: 71.3
*apparentTemperatureMinTime: 1537185600
*cloudCover: 0.07
*dewPoint: 69.29
*humidity: 0.73
*icon: "clear-day"
*moonPhase: 0.27
ozone: 260.91
*precipIntensity: 0.001
*precipIntensityMax: 0.0065
*precipIntensityMaxTime: 1537218000
*precipProbability: 0.1
*precipType: "rain"
*pressure: 1013.02
*summary: "Clear throughout the day."
sunriseTime: 1537186567
sunsetTime: 1537230971
*temperatureHigh: 88.64
*temperatureHighTime: 1537221600
*temperatureLow: 70.89
*temperatureLowTime: 1537268400
*temperatureMax: 88.64
*temperatureMaxTime: 1537221600
*temperatureMin: 70.34
*temperatureMinTime: 1537185600
*time: 1537160400
uvIndex: 9
uvIndexTime: 1537207200
*visibility: 10
*windBearing: 182
*windGust: 13.88
*windGustTime: 1537243200
*windSpeed: 5.7
**/
export class WxDay{

	time: number;

	//Conditions
	summary: string;
	icon: string;
	//Temperature
	temp: TempArray;
	feelsLike: TempArray;
	//Humidity
	rh: number;
	dewpoint: number;
	//Wind
	windDir: number;
	windSpeed: number;
	windGust: number[];
	//Other wx
	cloudCover: number;
	visibility: number;
	pressure: number;
	//Precip
	precipType: string;
	precipIntensity: number[];
	precipProbability: number;
	//Almanac
	moonPhase: number;
	sunriseTime: number;
	sunsetTime: number;
	//Environmental
	uvIndex: number[];
	ozone: number;

	constructor(obj?: any){
		//console.log(obj);
		this.time = obj.time;
		this.summary = obj.summary;
		this.icon = this.weatherIcon(obj.icon);
		this.temp = new TempArray(
			[obj.temperatureHigh, obj.temperatureHighTime],
			[obj.temperatureLow, obj.temperatureLowTime],
			[obj.temperatureMax, obj.temperatureMaxTime],
			[obj.temperatureMin, obj.temperatureMinTime]
			);
		this.feelsLike = new TempArray(
			[obj.apparentTemperatureHigh, obj.apparentTemperatureHighTime],
			[obj.apparentTemperatureLow, obj.apparentTemperatureLowTime],
			[obj.apparentTemperatureMax, obj.apparentTemperatureMaxTime],
			[obj.apparentTemperatureMin, obj.apparentTemperatureMinTime]
			);
		this.rh = obj.humidity;
		this.dewpoint = obj.dewPoint;
		this.windDir = obj.windBearing;
		this.windSpeed = obj.windSpeed;
		this.windGust = [obj.windGust, obj.windGustTime];
		this.cloudCover = obj.cloudCover;
		this.visibility = obj.visibility;
		this.pressure = obj.pressure;
		this.precipType = obj.precipType;
		this.precipProbability = obj.precipProbability;
		this.precipIntensity = [obj.precipIntensity, obj.precipIntensityMax, obj.precipIntensityMaxTime];
		this.moonPhase = obj.moonPhase;
		this.sunriseTime = obj.sunriseTime;
		this.sunsetTime = obj.sunsetTime;
		this.uvIndex = [obj.uvIndex, obj.uvIndexTime];
		this.ozone = obj.ozone;
	}

	
	weatherIcon(icon) {
		switch (icon) {
			case 'clear-day':
				return 'wi wi-day-sunny';
			case 'clear-night':
				return 'wi wi-night-clear';
			case 'rain':
				return 'wi wi-rain';
			case 'snow':
				return 'wi wi-snow';
			case 'sleet':
				return 'wi wi-sleet';
			case 'wind':
				return 'wi wi-windy';
			case 'fog':
				return 'wi wi-fog';
			case 'cloudy':
				return 'wi wi-cloudy';
			case 'partly-cloudy-day':
				return 'wi wi-day-cloudy';
			case 'partly-cloudy-night':
				return 'wi wi-night-alt-partly-cloudy';
			case 'hail':
				return 'wi wi-hail';
			case 'thunderstorm':
				return 'wi wi-thunderstorm';
			case 'tornado':
				return 'wi wi-tornado';
			default:
				return 'wi wi-na';
		}
	}

}