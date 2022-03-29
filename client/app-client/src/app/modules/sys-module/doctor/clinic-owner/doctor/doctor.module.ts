import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';

const routes: Routes = [
  { path: "", component: DoctorListComponent },
  { path: "add", component: DoctorAddComponent },
  { path: "edit/:id", component: DoctorEditComponent }
]


@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorAddComponent,
    DoctorEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DoctorListComponent,
    DoctorAddComponent,
    DoctorEditComponent,
  ]
})
export class DoctorModule { }
