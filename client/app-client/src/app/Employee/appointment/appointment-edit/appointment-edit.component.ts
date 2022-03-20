import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/appointments.service';
import { MedicineService } from 'src/app/medicine.service';
import { Appointment } from 'src/app/_model/appointment';
import { Doctor } from 'src/app/_model/doctor';

@Component({
  selector: 'pm-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  constructor(private AppSer: AppointmentsService, public router: Router, private medSer: MedicineService) { }
  editedAppointment: Appointment = new Appointment("", new Date(), "");
  docList: Doctor[] = this.medSer.getAllDoctors();

  ngOnInit(): void {
    this.editedAppointment = this.AppSer.getAppointmentByDocName(this.AppSer.DocName);
  }
  SaveEditedMedicine() {
    this.AppSer.editAppointment(this.editedAppointment);
    this.router.navigate(['appointment'])
  }

}
