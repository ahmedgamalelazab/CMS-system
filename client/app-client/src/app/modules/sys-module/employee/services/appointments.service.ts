import { Injectable } from '@angular/core';
import { Appointment } from '../_model/appointment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(public http: HttpClient) { }

  // private appointments: Appointment[] = [
  //   new Appointment("Dr.Joe", new Date('2022-3-15'), "9:00"),
  //   new Appointment("Dr.Adam", new Date('2022-1-31'), "10:30"),
  //   new Appointment("Dr.Tom", new Date('2022-2-14'), "21:00"),
  // ]
  DocName: string = "";
  // baseUrl: string = "http://localhost:9999/api/v1/appointment/clinic/doctors";
  baseUrl: string = "http://localhost:9999/api/v1/appointment";

  //***********Get**********/
  getAllAppointments() {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.get<any>(this.baseUrl, {
      headers: {
        'x-auth-token': userData.token
      }
    }).pipe(tap((response) => console.log(response)));
  }

  //***********Delete by Id********* */ 
  deleteAppointments(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.delete<any>(this.baseUrl + '/remove/' + id, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }

  //***********Add********* */
  AddAppointment(app: any) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.post<any>(this.baseUrl + '/add', app, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }

  //***********Edit Appointment********* */ 
  editAppointment(id: string | null, app: Appointment) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.put<any>(this.baseUrl + "/update/" + id, app, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }
  //***********Get by Id********* */ 
  getappointmentByID(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.get<any>(this.baseUrl + "/" + id, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }// end of get by Id

  //***********Get by Date********* */ 
  getappointmentBydate(date: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.get<any>(this.baseUrl + "/date/" + date, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }// end of get by Id

  //****Get Clinic Doctors***/
  getClinicAppointmentsController() {
    const userData = JSON.parse(window.sessionStorage.getItem('employee') ?? '');
    return this.http.get<any>(this.baseUrl + "/clinic/doctors", {
      headers: {
        'x-auth-token': userData.token
      }
    }).pipe(tap((response) => {
      console.log("res", response);
      // this.clinicId = response.data[0].clinic._id;
      // console.log("my clinic", this.clinicId);

    }));
  }

}
