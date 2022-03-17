import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { ClinicOwnerComponent } from './clinic-owner.component';
import { DoctorModule } from './doctor/doctor.module';
import { EmployeeModule } from './employee/employee.module';

const routes: Routes = [
  { path: "", redirectTo: "/clinic-owner/doctor", pathMatch: "full" },
  { path: "doctor", loadChildren: () => import("./doctor/doctor.module").then(m => m.DoctorModule) },
  { path: "employee", loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule) },
]
@NgModule({
  declarations: [
    ClinicOwnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DoctorModule,
    EmployeeModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ClinicOwnerComponent
  ]
})
export class ClinicOwnerModule { }
