import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineEditComponent } from './medicine-edit/medicine-edit.component';
import { MedicineDeleteComponent } from './medicine-delete/medicine-delete.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: MedicineListComponent },
  { path: "add", component: MedicineAddComponent },
  { path: "edit/:id", component: MedicineEditComponent },
];

@NgModule({
  declarations: [
    MedicineListComponent,
    MedicineEditComponent,
    MedicineDeleteComponent,
    MedicineAddComponent
  ],
  imports: [
    CommonModule, FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MedicineListComponent,
    MedicineAddComponent,
    MedicineEditComponent,
    MedicineDeleteComponent
  ]
})
export class MedicineModule { }