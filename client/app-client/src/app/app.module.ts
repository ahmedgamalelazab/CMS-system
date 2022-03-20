import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeModule } from './Employee/employee.module';
import * as $ from 'jquery';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:"home",component:HomeComponent},

  { path: "employee", loadChildren: () => import("./Employee/employee.module").then(m => m.EmployeeModule) },
  { path: "", redirectTo: "/employee", pathMatch: "full" },
  // { path: "medicine", loadChildren: () => import("./Employee/medicine/medicine.module").then(m => m.MedicineModule) },
  // { path: "appointment", loadChildren: () => import("./Employee/appointment/appointment.module").then(m => m.AppointmentModule) },

  // {path:"students",loadChildren:()=>import("./students/students.module").then(m=>m.StudentsModule)},
  // {path:"**",component:ErrorComponent},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
