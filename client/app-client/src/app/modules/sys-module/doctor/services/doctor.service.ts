import { Injectable } from '@angular/core';

import { Doctor } from "../_models/doctor";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const requestOptions = {
  headers: new Headers(headerDict),
};
console.log(requestOptions);

@Injectable({
  providedIn: 'root'
})


export class DoctorService {

  constructor(public http: HttpClient) { }

  baseUrl: string = "http://localhost:9999/api/v1/doctors";

  getAllDoctors() {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.get<any>("http://localhost:9999/api/v1/clinics/MyClinicId/doctors", {
      headers: {
        'x-auth-token': userData.token
      }
    })

  }

  getDoctorById(docId:String) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.get<any>(this.baseUrl+'/'+docId, {
      headers: {
        'x-auth-token': userData.token
      }
    })

  }
  //***********Add********* */
  addNewDoctor(newDoc: Doctor) {
    console.log(newDoc);
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');

    return this.http.post<any>(this.baseUrl + '/add', {
      "docName": newDoc.name,
      "docAge": newDoc.age,
      "assignedBy": newDoc.assignedBy,
      "userEmail": newDoc.email,
      "userPassword": newDoc.password
    },
      {
        headers: {
          'x-auth-token': userData.token
        }
      });

  }
  //***********Delete by Id********* */ 
  removeDoctor(id: string) {
    console.log(id)
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.delete<any>(this.baseUrl + "/delete/" + id, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }

  editDoctor(id: string | null, editDoc: Doctor) {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor') ?? '');
    return this.http.put<any>(this.baseUrl + "/update/" + id, {
      "docName": editDoc.name,
      "docAge": editDoc.age,
    }, {
      headers: {
        'x-auth-token': userData.token
      }
    });
  }

  getAllDoctorPatients() {
    const userData = JSON.parse(window.sessionStorage.getItem('doctor')??'');
    return this.http.get<any>("http://localhost:9999/api/v1/doctors/all/patients",{
      headers:{
        'x-auth-token':userData.token
      }
    })
  }

}
