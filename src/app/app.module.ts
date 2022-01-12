import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { FondoComponent } from './fondo/fondo.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    FondoComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
