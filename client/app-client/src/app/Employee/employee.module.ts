import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientModule } from './patient/patient.module';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes:Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"patient",loadChildren:()=>import("./patient/patient.module").then(m=>m.PatientModule)},
]

@NgModule({
  declarations: [
    EmployeeComponent,
    HomeComponent
  ],
  imports: [
  CommonModule,
    PatientModule,
    RouterModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    
  ],
  exports:[
    EmployeeComponent,
    NgxPaginationModule
  ]
})

export class EmployeeModule { }
