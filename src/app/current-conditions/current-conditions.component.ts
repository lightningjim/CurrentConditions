import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { DarkSkyService } from '../dark-sky.service';
import { Observable } from 'rxjs';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
	selector: 'app-current-conditions',
	templateUrl: './current-conditions.component.html',
	styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, AfterViewInit {

	lat: number;
	lng: number;
	wxData: Observable<any>;
	private d3: D3;
	private parentNativeElement: any;
	d3ParentLement: Selection<any, any, any, any>;
	private alive: boolean;
	private interval: number;

	constructor(private darksky: DarkSkyService, d3Service: D3Service, element:ElementRef) { 
		this.d3 = d3Service.getD3();
		this.parentNativeElement = element.nativeElement;
		this.alive = true;
		this.interval = 300000;
	}

	ngOnInit() {
		this.lat = 35.443275;
		this.lng = -97.595879;
		this.getForecast();
	}

	ngAfterViewInit() {
	
	}

	getForecast()
	{
		TimerObservable.create(0, 300000)
                    .takeWhile(() => this.alive)
                    .subscribe(() => {
                      this.darksky.currentForecast(this.lat, this.lng)
                        .subscribe((data) => {
                          this.wxData = data;
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

	dotw(dow: number){
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


}
