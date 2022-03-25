import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DoctorComponent } from './doctors/doctor.component';
import { FormsModule } from '@angular/forms';
import { ClinicsComponent } from './clinic/clinics/clinics.component';
import { ClinicDoctorsComponent } from './clinic/doctors/clinicDoctors.component';
import { ClinicEmployeesComponent } from './clinic/employees/clinicEmployees.component';
import { ClinicProfileComponent } from './clinic/profile/clinicProfile.component';
import { DoctorProfileComponent } from './doctorProfile/doctorProfile.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ClinicComponent,
    ClinicsComponent,
    ClinicDoctorsComponent,
    ClinicEmployeesComponent,
    ClinicProfileComponent,
    DoctorComponent,
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'Dashboard', component: DashboardComponent },
          {
            path: 'clinic',
            component: ClinicComponent,
            children: [
              { path: '', redirectTo: 'clinics', pathMatch: 'full' },
              { path: 'clinics', component: ClinicsComponent },
              { path: 'doctors', component: ClinicDoctorsComponent },
              { path: 'employees', component: ClinicEmployeesComponent },
              { path: 'profile', component: ClinicProfileComponent },
            ],
          },
          { path: 'doctors', component: DoctorComponent },
          { path: 'doctors/:id/profile', component: DoctorProfileComponent },
        ],
      },
    ]),
  ],
  exports: [CommonModule, FormsModule],
})
export class AdminModule {}
