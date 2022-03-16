import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionListComponent } from './Prescription/prescription-list/prescription-list.component';


const routes:Routes=[
  //{path:"",redirectTo:"/prescription",pathMatch:"full"},
  {path:"",component:PrescriptionListComponent},
  {path:"prescription",loadChildren:()=>import("./Prescription/prescription.module").then(m=>m.PrescriptionModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
