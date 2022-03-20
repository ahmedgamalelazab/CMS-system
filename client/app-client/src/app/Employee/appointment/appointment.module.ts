import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: AppointmentListComponent },
  { path: "add", component: AppointmentAddComponent },
  { path: "edit/:id", component: AppointmentEditComponent },



];
@NgModule({
  declarations: [
    AppointmentAddComponent,
    AppointmentListComponent,
    AppointmentEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AppointmentAddComponent,
    AppointmentListComponent,
    AppointmentEditComponent
  ]
})
export class AppointmentModule { }
