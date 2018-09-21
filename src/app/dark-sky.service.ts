import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DarkSkyService {

  readonly ROOT_URL = 'https://us-central1-current-conditions-6edd7.cloudfunctions.net/darkSkyProxy';

  constructor(private http: HttpClient) { }

  currentForecast(latlng: number[]): Observable<any> {
  	var lat = latlng[0];
  	var lng = latlng[1];
    let params = new HttpParams()
    params = params.set('lat', lat.toString() )
    params = params.set('lng', lng.toString() )

    return this.http.get(this.ROOT_URL, { params })
  }

}

