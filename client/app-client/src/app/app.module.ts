import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { FormsModule } from '@angular/forms';
import { PrescriptionModule } from './Prescription/prescription.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,FormsModule,PrescriptionModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
