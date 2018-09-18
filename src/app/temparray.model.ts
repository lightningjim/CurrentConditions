/*
temperatureHigh: 88.64
temperatureHighTime: 1537221600
temperatureLow: 70.89
temperatureLowTime: 1537268400
temperatureMax: 88.64
temperatureMaxTime: 1537221600
temperatureMin: 70.34
temperatureMinTime: 1537185600
*/
export class TempArray{
	high: [number, number];
	low: [number, number];
	max: [number, number];
	min: [number, number];
	minIsLow: boolean;
	maxIsHigh: boolean;

	constructor(high: [number, number], low: [number, number],
		max: [number, number], min: [number, number]){
		this.high = high;
		this.low = low;
		if(high[0] == max[0] && high[1] == max[1]) {
			this.maxIsHigh = true;
			this.max = this.high;
		} else {
			this.maxIsHigh = false;
			this.max = max;
		}
		if(low[0] == min[0] && low[1] == min[1]) {
			this.minIsLow = true;
			this.min = this.low;
		} else {
			this.minIsLow = false;
			this.min = min;
		}
	}
}