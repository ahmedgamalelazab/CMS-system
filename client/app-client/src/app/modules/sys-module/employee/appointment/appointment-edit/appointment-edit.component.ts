import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../services/appointments.service';
import { MedicineService } from './../../services/medicine.service';
import { Appointment } from './../../_model/appointment';


@Component({
  selector: 'pm-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  appointmentId: string | null = "";

  constructor(private AppSer: AppointmentsService, public router: Router, public route: ActivatedRoute, private medSer: MedicineService) { }
  editedAppointment: Appointment = new Appointment("", "", "", new Date(), true, 0, "");
  // docList: Doctor[] = this.medSer.getAllDoctors();

  ngOnInit(): void {
    // this.editedAppointment = this.AppSer.getAppointmentByDocName(this.AppSer.DocName);
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    if (this.appointmentId != null) {
      this.AppSer.getappointmentByID(this.appointmentId).subscribe({
        next: respose => {
          if (respose.success) {
            this.editedAppointment = respose.data;
            // console.log("this app ", respose);

          }
        }
      });

    }//end of if
  }
  SaveEditedAppointement() {
    // console.log("app bedgore sent to save", this.editedAppointment);

    this.AppSer.editAppointment(this.appointmentId, this.editedAppointment).subscribe(response => {
      this.router.navigate(['/employee/appointment'])
    });
  }

}
