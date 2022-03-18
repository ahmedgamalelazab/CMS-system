import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DoctorComponent } from './doctors/doctor.component';
import { PatientComponent } from './patients/patient.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ClinicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {path:'',component: DashboardComponent},
          { path: 'Dashboard', component: DashboardComponent },
          { path: 'clinic', component: ClinicComponent },
          { path: 'doctors', component: DoctorComponent },
          { path: 'patient', component: PatientComponent },
        ],
      },
    ]),
  ],
  exports: [CommonModule],
})
export class AdminModule {}
