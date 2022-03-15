import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrescriptionAddComponent,
    PrescriptionListComponent,
    PrescriptionEditComponent
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports: [
    PrescriptionAddComponent,
    PrescriptionListComponent,
    PrescriptionEditComponent,
   ]
})
export class PrescriptionModule { }
