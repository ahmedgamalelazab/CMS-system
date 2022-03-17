import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import * as $ from 'jquery';

import { RouterModule, Routes } from '@angular/router';

import { ClinicOwnerModule } from './clinic-owner/clinic-owner.module';

const routes: Routes = [
  { path: "clinic-owner", loadChildren: () => import("./clinic-owner/clinic-owner.module").then(m => m.ClinicOwnerModule) },
  { path: "", redirectTo: "/clinic-owner", pathMatch: "full" },
]
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    ClinicOwnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
