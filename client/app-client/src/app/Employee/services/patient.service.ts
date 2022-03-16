import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs';
import { Patient } from './../_model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  static allPatients:Patient[] = [];

  constructor(private http:HttpClient) {
    let data:Patient[] = [];
    this.getAllPatients().subscribe(
      {
        next:pts=> {data = pts;},
        complete:()=>PatientService.allPatients = data
      })
  }

  private baseUrl:string="assets/test_data/patient.json"

  getAllPatients(){
    return this.http.get<Patient[]>(this.baseUrl).pipe(
      tap((obs)=>console.log(obs)),
    );
  }

  async getPatientById(id: number) {
    const resp = await (await fetch(this.baseUrl)).json();
    console.warn(resp);
    return resp[id-1];

    // return this.http.get<Patient[]>(this.baseUrl).pipe(
    //   tap((obs)=>console.log(obs)),
    // );

  }

  addPatient(newPatient:Patient){
    return this.http.post<Patient>(this.baseUrl,newPatient);
  }

  editPatient(ePatient:Patient){
    return this.http.put(this.baseUrl,ePatient);
  }

  removePatient(rPatient:Patient){
    return this.http.delete(this.baseUrl+"/"+rPatient._id);
  }


  // getAllPatients(){
  //   return this.http.get<Patient[]>(this.baseUrl);
  // }

  // getPatientById(id: number) {
  //   return this.http.get<Patient|null>(this.baseUrl+"/"+id);
  // }

  // addPatient(newPatient:Patient){
  //   return this.http.post<Patient>(this.baseUrl,newPatient);
  // }

  // editPatient(ePatient:Patient){
  //   return this.http.put(this.baseUrl,ePatient);
  // }

  // removePatient(rPatient:Patient){
  //   return this.http.delete(this.baseUrl+"/"+rPatient._id);
  // }
}
