import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DarkSkyService } from '../dark-sky.service';
import { Observable } from 'rxjs';
// import { do } from 'rxjs/add/operator/do'
// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterViewInit {
	lat: number;
	lng: number;
	wxData: Observable<any>;

 	constructor(private darksky: DarkSkyService) { }

	ngOnInit() {
		this.lat = 35.443275;
		this.lng = -97.595879;
		this.getForecast();
	}
	ngAfterViewInit() {
		$('#alert-cc').cycle({speed: 500});
		$('#alert-cc').cycle('add', "TEST");
		$('#alert-cc').cycle('reinit');
	}
	getForecast(){
		// this.wxData = this.darksky.currentForecast(this.lat, this.lng).do(data => console.log(data));
		this.wxData = this.darksky.currentForecast(this.lat, this.lng);
	}

}
