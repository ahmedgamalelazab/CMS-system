import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDeleteComponent } from './appointment-delete/appointment-delete.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';



@NgModule({
  declarations: [
    AppointmentAddComponent,
    AppointmentListComponent,
    AppointmentDeleteComponent,
    AppointmentEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppointmentModule { }
