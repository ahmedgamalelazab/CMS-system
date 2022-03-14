import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientModule } from './patient/patient.module';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  // {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/employee/patient",pathMatch:"full"},
  {path:"patient",loadChildren:()=>import("./patient/patient.module").then(m=>m.PatientModule)},
  {path:"",redirectTo:"/employee/patient",pathMatch:"full"},
  // {path:"students",loadChildren:()=>import("./students/students.module").then(m=>m.StudentsModule)},

  // {path:"**",component:ErrorComponent},
]

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
  CommonModule,
    PatientModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    EmployeeComponent
  ]
})
export class EmployeeModule { }
