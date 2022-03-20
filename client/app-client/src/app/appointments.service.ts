import { Injectable } from '@angular/core';
import { Appointment } from './_model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor() { }

  private appointments: Appointment[] = [
    new Appointment("Dr.Joe", new Date('2022-3-15'), "9:00"),
    new Appointment("Dr.Adam", new Date('2022-1-31'), "10:30"),
    new Appointment("Dr.Tom", new Date('2022-2-14'), "21:00"),
  ]
  DocName: string = "";

  //***********Get**********/
  getAllAppointments(): Appointment[] {
    return this.appointments;
  }

  //***********Add Appointment********* */
  AddAppointment(appointment: Appointment) {
    this.appointments.push(new Appointment(appointment.DocName, appointment.date, appointment.time));
    console.log("Appointment Added");
  }

  //***********Edit Appointment********* */
  editAppointment(eApp: Appointment) {
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i].DocName == eApp.DocName) {
        this.appointments[i].date = eApp.date;
        this.appointments[i].time = eApp.time;
        return
      }
    }
  }// end of edit

  //***********Get Appointment by DocName********* */ 
  getAppointmentByDocName(name: string): Appointment {
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i].DocName == name) {
        return new Appointment(this.appointments[i].DocName, this.appointments[i].date, this.appointments[i].time);
      }
    }
    return new Appointment("", new Date(), "");
  }// end of get by Id

}
