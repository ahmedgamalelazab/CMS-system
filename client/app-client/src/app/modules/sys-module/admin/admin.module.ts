import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DoctorComponent } from './doctors/doctor.component';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ClinicComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {path:'',component: DashboardComponent},
          { path: 'Dashboard', component: DashboardComponent },
          { path: 'clinic', component: ClinicComponent },
          { path: 'doctors', component: DoctorComponent },
        ],
      },
    ]),
  ],
  exports: [CommonModule,FormsModule],
})
export class AdminModule {}
