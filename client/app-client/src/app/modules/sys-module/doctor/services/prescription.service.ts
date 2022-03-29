import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Prescription } from './../_models/Prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(public http:HttpClient) { }
  //list of Prescription
  private baseUrl = "http://localhost:9999/api/v1/prescription";
  getAllClinicPrescription() {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.get<any>(this.baseUrl + 's/clinic', {
      headers: {
        'x-auth-token': userData.token
      }
    }).pipe(tap((response) => console.log(response)));

  }
  //get Prescription by id
  getPrescriptionByID(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.get<any>(this.baseUrl + "/" + id, {
      headers: {
        'x-auth-token': userData.token
      }

    });
  }
  //add to list of Prescription
  addPrescription(prescription: Prescription) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.post<any>(this.baseUrl + '/add', prescription, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }
  //edit  Prescription in list
  editPrescription(prescription: Prescription, id: string | null) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.put<any>(this.baseUrl + "/update/" + id, prescription, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }
  //delete Prescription from list
  deletePrescription(id: string) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.delete<any>(this.baseUrl + "/remove/" + id, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }
  
}
