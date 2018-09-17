/**
*apparentTemperature: 71.99
*cloudCover: 0.05
*dewPoint: 67.81
*humidity: 0.9
*icon: "clear-day"
nearestStormBearing: 315
nearestStormDistance: 8
ozone: 261.61
precipIntensity: 0
precipProbability: 0
*pressure: 1013.76
*summary: "Clear"
*temperature: 70.97
*time: 1537186943
uvIndex: 0
*visibility: 10
windBearing: 183
windGust: 3.81
windSpeed: 3.17
**/
export class WxDay{

	time: number;

	//Conditions
	summary: string;
	icon: string;
	//Temperature
	temp: number;
	feelsLike: number;
	//Humidity
	rh: number;
	dewpoint: number;
	//Wind
	windDir: number;
	windSpeed: number;
	windGust: number;
	//Other
	cloudCover: number;
	visibility: number;
	pressure: number;

	
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