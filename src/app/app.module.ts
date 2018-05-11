import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { D3Service } from 'd3-ng2-service';
// import './shared/rxjs-operators';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { DarkSkyService } from './dark-sky.service';
import { CurrentConditionsTwcComponent } from './current-conditions-twc/current-conditions-twc.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    CurrentConditionsComponent,
    CurrentConditionsTwcComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [HttpClientModule,DarkSkyService,D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
