import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { AlertComponent } from './alert/alert.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { DarkSkyService } from './dark-sky.service';
import { CurrentConditionsTwcComponent } from './current-conditions-twc/current-conditions-twc.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GeolocationService } from './geolocation.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AlertComponent,
    CurrentConditionsComponent,
    CurrentConditionsTwcComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgbModule
  ],
  providers: [HttpClientModule,DarkSkyService, GeolocationService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
