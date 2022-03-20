import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/appointments.service';
import { MedicineService } from 'src/app/medicine.service';
import { Appointment } from 'src/app/_model/appointment';
import { Doctor } from 'src/app/_model/doctor';
import { Medicine } from 'src/app/_model/medicine';

@Component({
  selector: 'pm-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  constructor(private appSer: AppointmentsService, private medSer: MedicineService, public router: Router) { }

  ngOnInit(): void {
  }

  newAppointment: Appointment = new Appointment("", new Date(), "");
  docList: Doctor[] = this.medSer.getAllDoctors();



  save() {
    this.appSer.AddAppointment(this.newAppointment);
    this.router.navigate(['appointment'])
  }
}

