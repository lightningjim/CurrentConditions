import { Component, OnInit, ElementRef, AfterContentInit, Renderer2, ViewChild } from '@angular/core';
import { DarkSkyService } from '../dark-sky.service';
import { Observable } from 'rxjs';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';
import { WxDay } from '../wxday.model';
import * as d3 from "d3";

@Component({
	selector: 'app-current-conditions',
	templateUrl: './current-conditions.component.html',
	styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

	lat: number;
	lng: number;
	latlng: number[];
	wxData: Observable<any>;
	private alive: boolean;
	private interval: number;

	updated: number;
	lows: number[][];
	highs: number[][];
	forecast: WxDay[];

	alerts: any[];
	alertHidden: boolean; //alert
	@ViewChild('alertText') alertElement: ElementRef;

	constructor(private darksky: DarkSkyService) { 
		this.alive = true;
		this.interval = 300000;
	}

	ngOnInit() {
		// this.latlng = this.getLocation();
		// console.log("Outside " + this.latlng);
		this.lat = 35.443275;
		this.lng = -97.595879;
		this.forecast = [];
		this.getForecast([this.lat, this.lng]);
		// this.getForecast(this.getLocation());
		this.alertHidden = true;
	}

	ngAfterContentInit() {
		d3.select("svg").style("color", "red");
	}

	// getLocation(): //number[]
	// {
	// 	// var source = Rx.DOM.Geolocation.getCurrentPosition();
	// // 	if (navigator.geolocation) {
	// // 		navigator.geolocation.getCurrentPosition(
	// // 			position => {
	// // 				var latlng = [ position.coords.latitude, position.coords.longitude ]; 
	// // 				console.log("From Geo function:" + latlng);
	// // 				return latlng;
	// // 			}
	// // 		);
	// // 	}
	// // 	else
	// // 	{
	// // 		return [ 35.443275, -97.595879 ];
	// // 	}
	// }

	getForecast(latlng: number[])
	{
		// console.log("Inside: " + latlng;
		TimerObservable.create(0, this.interval)
                    .takeWhile(() => this.alive)
                    .subscribe(() => {
                    	this.darksky.currentForecast(latlng)
                        .subscribe((data) => {
                        	this.updated = Date.now();
                        	this.wxData = data;
                        	this.forecast = [];
                        	this.lows = [];
                        	this.highs = [];
                        	this.alerts = data.alerts;
                        	console.log(this.alerts);
                        	data.daily.data.forEach(
                        		(newDay) => {
                        			let tempWxDay = new WxDay(newDay)
                        			this.forecast.push(tempWxDay);
                        			this.lows.push(tempWxDay.temp.low);
                        			this.highs.push(tempWxDay.temp.high);
                        			//console.log(this.forecast);
                        			//console.log(this.highs);
                        		}
                        	);

                        	this.drawHighLows();
                        	console.log(data);
                        }
                      )
                    });
	}

	twc_weatherIcon(icon) {
		switch (icon) {
			case 'clear-day':
				return 'Sunny';
			case 'clear-night':
				return 'Clear';
			case 'rain':
				return 'Rain';
			case 'snow':
				return 'Light-Snow';
			case 'sleet':
				return 'Sleet';
			case 'wind':
				return 'Windy';
			case 'fog':
				return 'Fog';
			case 'cloudy':
				return 'Cloudy';
			case 'partly-cloudy-day':
				return 'Party-Cloudy';
			case 'partly-cloudy-night':
				return 'Partly-Clear';
			case 'hail':
				return 'Thunderstorm';
			case 'thunderstorm':
				return 'Thunderstorm';
			case 'tornado':
				return 'Thunderstorm';
			default:
				return '';
		}
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

	dateToText(timestamp: number){
		var now = Date.now()/1000;
		var timestampDate = new Date(timestamp*1000);
		// console.log("Now: " + now.toString());
		// console.log("TS: " + timestamp);
		if (now > timestamp)
			return "Today";
		if (now + 86400 > timestamp)
			return "Tomorrow";
		else
			return this.dotw(timestampDate.getDay());
	}

	alertDateToText(timestamp: number){
		// console.log("Test timestamp " + timestamp);
		var timestampDate = new Date(timestamp*1000);
		// console.log(timestampDate - Date.now())
		if (timestampDate.getTime() - Date.now() >= 86400000)
		{			
			// console.log("Greater than 1 day");
			return this.dotw(timestampDate.getDay()) + " " + this.timeToString(timestampDate);
		}
		else{
			// console.log("Less than one day");
			return this.timeToString(timestampDate);
		}

	}

	dotw(dow: number): string{
		switch (dow){
			case 0:
				return 'Sun';
			case 1:
				return 'Mon';
			case 2:
				return 'Tue';
			case 3:
				return 'Wed';
			case 4:
				return 'Thu';
			case 5:
				return 'Fri';
			case 6:
				return 'Sat';
		}
	}

	timeToString(timestamp: Date): string{
		var ampm, hour, minute;
		if (timestamp.getHours() == 0)
		{
			hour = "12";
			ampm = "AM";
		} else if (timestamp.getHours() == 12)
		{
			hour = "12";
			ampm = "PM";

		}
		else if (timestamp.getHours() > 12)
		{
			hour = timestamp.getHours() - 12;
			ampm = "PM";
		}
		else
		{
			hour = timestamp.getHours();
			ampm = "AM";

		}

		if(timestamp.getMinutes() < 10) minute = "0" + timestamp.getMinutes();
		else minute = timestamp.getMinutes();

		return hour + ":" + minute + " " + ampm;
	}

	alertShow(alertDesc: string)
	{
		this.alertHidden = !(this.alertHidden);
		this.alertElement.nativeElement.innerHTML = alertDesc;
		// console.log(this.alertElement);
	}

	alertHide()
	{
		this.alertHidden = true;
	}

	drawHighLows()
	{

	}


}
