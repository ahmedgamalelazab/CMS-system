import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../services/appointments.service';
import { Appointment } from './../../_model/appointment';

@Component({
  selector: 'pm-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appSer: AppointmentsService) { }


  appointments: Appointment[] = []
  appointmentList: Appointment[] = [];
  doc: any[] = [];
  ngOnInit(): void {
    this.appSer.getClinicAppointmentsController().subscribe({
      next: response => {
        if (response.success) {
          this.appointments = response.data;
          this.appointmentList = response.data;
          // response.data.forEach((i: any) => {
          //   this.doc.push(i.clinic.doctors);
          // })
          // console.log("doc id", this.doc.length);
          // this.doc.push(response.data.)

          // response.data.clinic.doctors.forEach((i: any) => {
          //   this.doc.push(i);
          // });
          // this.appointmentList = response.data;
          console.log("res   ", response);
          console.log("doc ", this.doc);


        }//end of if
        console.log("appointmentList   ", this.appointmentList);
      }//end of next
      ,
      error: (err) => { console.log(err) }
    })//end of subscripe

  }//end of OnInit


  //Search 
  searchAppointment(name: string) {
    if (name.length == 0) {
      this.appointmentList = this.appointments;
      return;
    }

    this.appointmentList = [];
    this.appointments.forEach(element => {
      if (element.doctor.toLowerCase().startsWith(name.toLowerCase()))
        this.appointmentList.push(element);
    });

  }//end of search

  DeleteAppointment(appId: string) {
    this.appSer.deleteAppointments(appId).subscribe(() => {
      this.appointmentList = this.appointmentList.filter(el => el._id !== appId);
    })
  }

  // DeleteAppointment(_DocName: string) {
  //   for (let i = 0; i < this.appointments.length; i++) {
  //     if (this.appointments[i].DocName.toLowerCase() == _DocName.toLowerCase()) {
  //       this.appointments.splice(i, 1);
  //     }
  //   }
  //   console.log(this.appointments);

  // }//End of delete
  // PassDocName(docName: string) {
  //   this.appSer.DocName = docName;
  // }
}//end of class
