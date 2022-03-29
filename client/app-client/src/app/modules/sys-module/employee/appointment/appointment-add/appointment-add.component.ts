import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../services/appointments.service';
import { Appointment } from './../../_model/appointment';
import { AdminClinicService } from '../../../admin/services/admin.clinic.service'
import { PatientService } from '../../services/patient.service'
@Component({
  selector: 'pm-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  token: string = '';
  patientId: string | null = "";
  ClinicDoctors: any[] = [];
  doctorId: any;
  _clinicID: string = "MyClinicID";
  newAppointment: Appointment = new Appointment("", "", "", new Date(), false, 0, '');//623f6986e37ee1f1956c253d

  constructor(private appSer: AppointmentsService, private paSer: PatientService, 
    private clinicSer: AdminClinicService, public router: Router, public route: ActivatedRoute) { }//end of constructor

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    console.log("patient id", this.patientId);

    this.clinicSer.adminGetClinicDoctors('MyClinicID').subscribe({
      next: response => {
        if (response.success) {
          console.log("ClinicDoctors", response);
          response.data.map((item: any) => {
            this.ClinicDoctors.push(item)
          })
        }
      }
    })

  }

  save(confirmed: boolean, price: Number, payment: string) {
    this.newAppointment = new Appointment(this._clinicID, this.doctorId, this.patientId, new Date(), confirmed, price, payment);//623f6986e37ee1f1956c253d
    console.log("doc", this.doctorId);
    const sentApp = {
      doctorId: this.doctorId,
      patientId: this.patientId,
      date: this.newAppointment.date,
      isConfirmed: confirmed,
      totalPrice: price,
      payment: payment,
    }
    console.log(sentApp);

    this.appSer.AddAppointment(sentApp).subscribe(() => this.router.navigate(['/employee/appointment'])
    );

  }

  // newAppointment: Appointment = new Appointment("", new Date(), "");
  // docList: Doctor[] = this.medSer.getAllDoctors();


  // save() {
  //   this.appSer.AddAppointment(this.newAppointment);
  //   this.router.navigate(['appointment'])
  // }
}


