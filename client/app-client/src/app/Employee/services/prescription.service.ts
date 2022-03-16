import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs';
import { Prescription } from './../_model/prescription';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService {

    static allPrescriptions:Prescription[] = [];

    constructor(private http:HttpClient) {
    }

    private baseUrl:string="assets/test_data/prescriptions.json"

    getAllPrescriptions(){
        return this.http.get<Prescription[]>(this.baseUrl).pipe(
            tap((obs)=>console.log(obs)),
        );
    }

    async getPatientById(id: number) {
        return PrescriptionService.allPrescriptions[id-1];
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
