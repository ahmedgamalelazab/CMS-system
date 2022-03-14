import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {path:"",component:PatientListComponent},
  {path:"add",component:PatientAddComponent},
  {path:"edit/:id",component:PatientEditComponent},
  // {path:"details/:id",component:DepartmentDetailsComponent},
]

@NgModule({
  declarations: [
    PatientListComponent,
  
    // PatientAddComponent
  
    PatientEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    PatientListComponent,
    PatientEditComponent
  ]
})
export class PatientModule { }
