import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


const routes: Routes = [
  { path: "", component: PatientListComponent },
  { path: "add", component: PatientAddComponent },
  { path: "edit/:id", component: PatientEditComponent },
  { path: "profile/:id", component: PatientProfileComponent },
]

@NgModule({
  declarations: [
    PatientListComponent,

    // PatientAddComponent

    PatientEditComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PatientListComponent,
    PatientEditComponent
  ]
})
export class PatientModule { }
