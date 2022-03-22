import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './modules/app-routes/app-routes.module';
import { ScriptService } from './modules/sys-module/services/script.store.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,

  ],
  providers:[ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
