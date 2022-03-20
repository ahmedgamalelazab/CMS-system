import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/appointments.service';
import { Appointment } from 'src/app/_model/appointment';

@Component({
  selector: 'pm-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appSer: AppointmentsService) { }

  ngOnInit(): void {
  }

  appointments: Appointment[] = this.appSer.getAllAppointments();
  appointmentList: Appointment[] = this.appointments;

  //Search 
  searchAppointment(name: string) {
    if (name.length == 0) {
      this.appointmentList = this.appointments;
      return;
    }

    this.appointmentList = [];
    this.appointments.forEach(element => {
      if (element.DocName.toLowerCase().startsWith(name.toLowerCase()))
        this.appointmentList.push(element);
    });

  }//end of search
  DeleteAppointment(_DocName: string) {
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i].DocName.toLowerCase() == _DocName.toLowerCase()) {
        this.appointments.splice(i, 1);
      }
    }
    console.log(this.appointments);

  }//End of delete
  PassDocName(docName: string) {
    this.appSer.DocName = docName;
  }
}//end of class
