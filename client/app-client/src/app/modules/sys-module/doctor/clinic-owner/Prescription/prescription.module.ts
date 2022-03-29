import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  { path: "", component: PrescriptionListComponent },
  { path: "add", component: PrescriptionAddComponent },
  { path: "edit/:id", component: PrescriptionEditComponent }
]

@NgModule({
  declarations: [
    PrescriptionAddComponent,
    PrescriptionListComponent,
    PrescriptionEditComponent
  ],
  imports: [
    CommonModule, FormsModule, NgxPaginationModule, RouterModule.forChild(routes)
  ],
  exports: [
    PrescriptionAddComponent,
    PrescriptionListComponent,
    PrescriptionEditComponent,
    FormsModule
  ]
})
export class PrescriptionModule { }
