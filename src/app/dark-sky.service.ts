import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DarkSkyService {

  readonly ROOT_URL = 'https://us-central1-current-conditions-6edd7.cloudfunctions.net/darkSkyProxy';

  constructor(private http: HttpClient) { }

  currentForecast(lat: number, lng: number): Observable<any> {
    let params = new HttpParams()
    params = params.set('lat', lat.toString() )
    params = params.set('lng', lng.toString() )

    return this.http.get(this.ROOT_URL, { params })
  }

}

